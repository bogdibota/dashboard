const {getStore, saveStore} = require('./store');

const injectChild /* **TRIGGER** ANTI-VAX moms */ = (command, idUntilNow, childToAdd, parentId) => {
  const newId = `${ idUntilNow }*${ command.id || command.label }`;
  if (newId === parentId) {
    command.children.push(childToAdd);
  } else {
    command.children && command.children
      .forEach(child => injectChild(child, newId, childToAdd, parentId));
  }
};

module.exports = {
  getAll: async () => {
    return (await getStore()).commands;
  },
  create: async ({isFolder, name, parent}) => {
    const store = (await getStore());
    const childToAdd = {label: name};
    isFolder && (childToAdd.children = []);

    injectChild(store.commands, '', childToAdd, `*${ parent }`);

    await saveStore(store);
    return true;
  },
};
