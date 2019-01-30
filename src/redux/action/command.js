import createActions from "./creator";

const moduleName = 'command';
export default {
    ...createActions(moduleName, 'getAll')
};
