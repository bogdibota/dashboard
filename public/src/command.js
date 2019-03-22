const {getStore, saveStore} = require('./store');
const {runAction} = require('./exec');

const injectChild /* **TRIGGER** ANTI-VAX moms */ = (command, idUntilNow, childToAdd, parentId) => {
  const newId = `${ idUntilNow }*${ command.id || command.label }`;
  if (newId === parentId) {
    command.children.push(childToAdd);
  } else {
    command.children && command.children
      .forEach(child => injectChild(child, newId, childToAdd, parentId));
  }
};

const findCommand = (command, idUntilNow, mutateCommand, commandId) => {
  const newId = `${ idUntilNow }*${ command.id || command.label }`;
  if (newId === commandId) {
    mutateCommand(command);
  } else {
    command.children && command.children
      .forEach(child => findCommand(child, newId, mutateCommand, commandId));
  }
};

const removeCommand = (command, commandId) => {
  let path = commandId.split('*');
  const label = path.pop();
  const parentFullPath = path.reduce((acc, it) => acc + '*' + it);
  path.shift();
  let parentCommand = command;
  path.forEach((command) => {
    parentCommand = parentCommand.children.find(x => x.label === command);
  });
  parentCommand.children = parentCommand.children.filter(x => x.label !== label);
  return {...parentCommand, id: parentFullPath};
};

const getCommand = (command, idUntilNow, commandId) => {
  const newId = `${ idUntilNow }*${ command.id || command.label }`;
  if (newId === commandId) {
    return [ command ];
  } else {
    return (
      command.children && command.children
        .map(child => getCommand(child, newId, commandId))
        .reduce((acc, it) => acc.concat(it), [])
        .filter(it => it)
    ) || [];
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
  update: async ({label, action, runArgs, id}) => {
    const store = (await getStore());

    findCommand(store.commands, '', (command) => {
      command.label = label;
      command.action = action;
      command.runArgs = runArgs;
    }, `*${ id }`);

    await saveStore(store);
    return true;
  },
  run: async ({id}, {onStatusChange}) => {
    const store = (await getStore());

    const {action, runArgs} = getCommand(store.commands, '', `*${ id }`)[0];
    if (!action) throw new Error(`No action for command ${ id }`);
    await runAction(id, action, runArgs, onStatusChange);

    return true;
  },
  delete: async ({id}) => {
    const store = (await getStore());

    const parent = removeCommand(store.commands,  id);

    await saveStore(store);
    return parent;
  },
};
