const path = require('path');
const app = require('electron').app;
const {spawn} = require('child_process');

const afs = require('./afs');

const idToPath = (id) => id.replace(/\*/g, '_');

module.exports = {
  runAction: async (id, action) => {
    const dataFolder = path.join(app.getPath('userData'), 'data', idToPath(id));
    const batFileName = 'run.bat';
    const batFile = path.join(dataFolder, batFileName);

    await afs.mkdir(dataFolder);
    await afs.writeFile(batFile, `${ action }\n`);

    const commandProc = spawn(`"${ batFile }"`, [], {shell: true, cwd: dataFolder});

    commandProc.stdout.on('data', (data) => {
      console.log(`stdout: ${ data }`);
    });

    commandProc.stderr.on('data', (data) => {
      console.log(`stderr: ${ data }`);
    });

    commandProc.on('close', (code) => {
      console.log(`child process exited with code ${ code }`);
    });
  },
};
