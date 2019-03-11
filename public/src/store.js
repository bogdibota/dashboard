const fs = require('fs');
const path = require('path');
const app = require('electron').app;

const afs = require('./afs');

const dataFolder = path.join(app.getPath('userData'), 'data');
const storeFile = path.join(dataFolder, 'store.json');

const DEFAULT_STORE = {
  commands: {
    id: 'ROOT',
    children: [ {
      label: 'databases',
      children: [ {
        label: 'mongo',
      }, {
        label: 'mysql',
      } ],
    }, {
      label: 'shut down',
    } ],
  },
};

const getStore = async () => {
  try {
    return await new Promise((resolve, reject) => fs.readFile(
      storeFile,
      'utf8',
      (err, data) => err ? reject(err) : resolve(JSON.parse(data)),
    ));
  } catch (ex) {
    if (ex.code === 'ENOENT') {
      await afs.mkdir(dataFolder);
      await afs.writeFile(storeFile, JSON.stringify(DEFAULT_STORE));
      return DEFAULT_STORE;
    }
    console.error(ex);
    throw ex;
  }
};

const saveStore = async (newStore) => {
  await afs.writeFile(storeFile, JSON.stringify(newStore));
};

module.exports = {
  getStore,
  saveStore,
};
