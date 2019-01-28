const { command: commandApi } = require('../api');
const { getAll: commandGetAll } = require('./command');

const toCb = (promise) => (cb, args) => promise(args).then(cb);

module.exports = {
    default: (app) => {
        // command
        app.on(commandApi.getAll, toCb(commandGetAll));
    }
};
