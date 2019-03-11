const commands = {
  id: 'ROOT',
  children: [ {
    label: 'databases',
    children: [ {
      label: 'mongo',
    }, {
      label: 'mysql',
    } ],
  }, {
    label: 'shut down',
  } ],
};

const injectChild /* **TRIGGER** ANTI-VAX moms */ = (command, idUntilNow, childToAdd, parentId) => {
  const newId = `${ idUntilNow }*${ command.id || command.label }`;
  if (newId === parentId) {
    command.children.push(childToAdd);
  } else {
    command.children && command.children
      .forEach(child => injectChild(child, newId, childToAdd, parentId));
  }
};

export const getAllCommands = async () => JSON.parse(JSON.stringify(commands));
export const createCommand = async ({isFolder, name, parent}) => {
  const childToAdd = {label: name};
  isFolder && (childToAdd.children = []);

  try {
    injectChild(commands, '', childToAdd, `*${ parent }`);
  } catch (e) {
    return {error: e};
  }
  return true;
};

export const updateCommand = async () => {
};
export const runCommand = async () => {
};
