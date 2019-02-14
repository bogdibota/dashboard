import { loadApi } from '../../api';

const withApi = (name) => async (args) => (await loadApi())[name](args);

export const getAllCommands = withApi('getAllCommands');
export const createCommand = withApi('createCommand');
