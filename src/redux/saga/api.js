import { loadApi } from '../../api';

const withApi = (name) => async (args) => (await loadApi())[name](args);

export const getAllCommands = withApi('getAllCommands');
export const createCommand = withApi('createCommand');
export const updateCommand = withApi('updateCommand');
export const runCommand = withApi('runCommand');
export const deleteCommand = withApi('deleteCommand');
