const { getStore } = require('./store');

module.exports = {
    getAll: async () => {
        return (await getStore()).commands;
    },
};
