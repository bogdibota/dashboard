import createActions from './creator';

const moduleName = 'command';
export default {
  ...createActions(moduleName, 'getAll'),
  ...createActions(moduleName, 'create'),
  ...createActions(moduleName, 'select'),
  ...createActions(moduleName, 'clearError'),
  ...createActions(moduleName, 'update'),
  ...createActions(moduleName, 'run'),
  ...createActions(moduleName, 'statusChange'),
  ...createActions(moduleName, 'delete'),
};
