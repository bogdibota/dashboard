const fs = require('fs');
const path = require('path');
const app = require('electron').app;

const DEFAULT_STORE = {
    commands: {
        children: []
    }
}

const getStore = async () => {
    const storeFile = path.join(app.getPath('userData'), 'store.json');
    try {
        const data = await new Promise((resolve, reject) => fs.readFile(
            storeFile,
            'utf8',
            (err, data) => err ? reject(err) : resolve(JSON.parse(data))
        ));
        return data;
    } catch (ex) {
        if (ex.code === 'ENOENT') {
            await new Promise((resolve, reject) => fs.writeFile(
                storeFile,
                JSON.stringify(DEFAULT_STORE),
                (err) => err ? reject(err) : resolve()
            ));
            return DEFAULT_STORE;
        }
        console.log(ex);
        throw ex;
    }
};

module.exports = {
    getStore,
};
