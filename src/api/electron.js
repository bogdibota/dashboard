const {app} = window.require('electron').remote;
const {command} = app.api;

const toPromise = (name, args) => new Promise((resolve) => app.emit(name, resolve, args));

export const getAllCommands = () => toPromise(command.getAll);
export const createCommand = ({isFolder, name, parent}) => toPromise(command.create, {isFolder, name, parent});
