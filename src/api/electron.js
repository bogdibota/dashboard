const {app} = window.require('electron').remote;
const {command} = app.api;

const toPromise = (name, args) => new Promise((resolve) => app.emit(name, resolve, args));

export const getAllCommands = () => toPromise(command.getAll);
export const createCommand = ({isFolder, name, parent}) => toPromise(command.create, {isFolder, name, parent});
export const updateCommand = ({label, action, id}) => toPromise(command.update, {label, action, id});
export const runCommand = ({id}) => toPromise(command.run, {id});

export const onStatusChange = (cb) => app.on(command.onStatusChange, cb);
