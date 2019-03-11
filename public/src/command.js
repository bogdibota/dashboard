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

const updateCommand = (command, idUntilNow, mutateCommand, commandId) => {
  const newId = `${ idUntilNow }*${ command.id || command.label }`;
  if (newId === commandId) {
    mutateCommand(command);
  } else {
    command.children && command.children
      .forEach(child => updateCommand(child, newId, mutateCommand, commandId));
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
  update: async ({label, action, id}) => {
    const store = (await getStore());

    updateCommand(store.commands, '', (command) => {
      command.label = label;
      command.action = action;
    }, `*${ id }`);

    await saveStore(store);
    return true;
  },
};
