const fs = require('fs');
const path = require('path');
const app = require('electron').app;

const DEFAULT_STORE = {
    commands: {
        id: 'ROOT',
        children: [{
            label: 'databases',
            children: [{
                label: 'mongo'
            }, {
                label: 'mysql'
            }]
        }, {
            label: 'shut down'
        }]
    }
}

const getStore = async () => {
    const dataFolder = path.join(app.getPath('userData'), 'data');
    const storeFile = path.join(dataFolder, 'store.json');
    try {
        const data = await new Promise((resolve, reject) => fs.readFile(
            storeFile,
            'utf8',
            (err, data) => err ? reject(err) : resolve(JSON.parse(data))
        ));
        return data;
    } catch (ex) {
        if (ex.code === 'ENOENT') {
            await new Promise((resolve, reject) => fs.mkdir(
                dataFolder,
                { recursive: true },
                (err) => err && err.code !== 'EEXIST' ? reject(err) : resolve()
            ));
            await new Promise((resolve, reject) => fs.writeFile(
                storeFile,
                JSON.stringify(DEFAULT_STORE),
                (err) => err ? reject(err) : resolve()
            ));
            return DEFAULT_STORE;
        }
        console.error(ex);
        throw ex;
    }
};

const saveStore = async (newStore) => {
    const dataFolder = path.join(app.getPath('userData'), 'data');
    const storeFile = path.join(dataFolder, 'store.json');

    await new Promise((resolve, reject) => fs.writeFile(
        storeFile,
        JSON.stringify(newStore),
        (err) => err ? reject(err) : resolve()
    ));
};

module.exports = {
    getStore,
    saveStore,
};
