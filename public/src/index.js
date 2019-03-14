const {command: commandApi} = require('../api');
const {
  getAll: commandGetAll,
  create: commandCreate,
  update: commandUpdate,
  run: commandRun,
} = require('./command');

const toCb = (promise, actions) => (cb, args) => promise(args, actions)
  .then(cb)
  .catch((error) => cb({error}));

module.exports = {
  default: (app) => {
    // command
    app.on(commandApi.getAll, toCb(commandGetAll));
    app.on(commandApi.create, toCb(commandCreate));
    app.on(commandApi.update, toCb(commandUpdate));
    app.on(commandApi.run, toCb(commandRun, {
      onStatusChange: (args) => app.emit(commandApi.onStatusChange, args),
    }));
  },
};
