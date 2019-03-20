const execStatus = require('./execStatus');

const prefix = 'dvk*';

const commandPrefix = 'command*';
module.exports = {
  command: {
    // react to electron
    getAll: `${ prefix }${ commandPrefix }getAll`,
    create: `${ prefix }${ commandPrefix }create`,
    update: `${ prefix }${ commandPrefix }update`,
    run: `${ prefix }${ commandPrefix }run`,
    delete: `${ prefix }${ commandPrefix }delete`,

    // electron to react
    onStatusChange: `${ prefix }${ commandPrefix }onStatusChange`,
  },
  enums: {
    execStatus,
  },
};
