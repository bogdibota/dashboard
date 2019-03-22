const path = require('path');
const app = require('electron').app;
const {spawn} = require('child_process');

const afs = require('./afs');
const execStatus = require('../api/execStatus');

const idToPath = (id) => id.replace(/\*/g, '_');

module.exports = {
  runAction: async (id, action, runArgs, onStatusChange) => {
    const dataFolder = path.join(app.getPath('userData'), 'data', idToPath(id));
    const batFileName = 'run.bat';
    const batFile = path.join(dataFolder, batFileName);

    await afs.mkdir(dataFolder);
    await afs.writeFile(batFile, `${ action }\n`);

    const commandProc = spawn(`"${ batFile }"`, runArgs.split(','), {shell: true, cwd: dataFolder});

    onStatusChange({id, status: execStatus.RUNNING});

    commandProc.stdout.on('data', (data) => {
      onStatusChange({id, status: execStatus.INFO, data: data.toString()});
      console.log(`stdout: ${ data }`);
    });

    commandProc.stderr.on('data', (data) => {
      onStatusChange({id, status: execStatus.ERROR, data: data.toString()});
      console.log(`stderr: ${ data }`);
    });

    commandProc.on('close', (code) => {
      if (code === 0) {
        onStatusChange({id, status: execStatus.DONE_SUCCESS});
      } else {
        onStatusChange({id, status: execStatus.DONE_ERROR});
      }
      console.log(`child process exited with code ${ code }`);
    });
  },
};
