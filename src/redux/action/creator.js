import _ from 'lodash';

const createActions = (moduleName, eventName) => {
  const actionName = `${ toUpperSnake(moduleName) }*${ toUpperSnake(eventName) }`;
  return {
    [_.camelCase(eventName)]: {
      emit: createAction(actionName, 'EMIT'),
      complete: createAction(actionName, 'COMPLETE'),
      error: createAction(actionName, 'ERROR'),
    },
  };
};

const createAction = (actionName, postfix) => {
  const qualifiedName = `${ actionName }*${ postfix }`;
  return {
    id: qualifiedName,
    create: args => ({type: qualifiedName, ...args}),
  };
};

const toUpperSnake = (str) => _.snakeCase(str).toUpperCase();

export default createActions;
