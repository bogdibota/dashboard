const prefix = 'dvk*';

const commandPrefix = 'command*';
module.exports = {
  command: {
    getAll: `${ prefix }${ commandPrefix }getAll`,
    create: `${ prefix }${ commandPrefix }create`,
    update: `${ prefix }${ commandPrefix }update`,
    run: `${ prefix }${ commandPrefix }run`,
  },
};
