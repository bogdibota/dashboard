import { command } from '../action';

const initialState = {
  commands: {children: []},
  status: {},
  logs: {},
  selectedCommand: undefined,
  errorMessage: undefined,
};

export default function reducer(state = initialState, action) {
  const {type, commands, selectedCommand, errorMessage, id, newStatus, newLog} = action;
  switch (type) {
    case command.getAll.complete.id:
      return {
        ...state,
        commands,
      };
    case command.select.emit.id:
      return {
        ...state,
        selectedCommand,
      };

    case command.run.error.id:
    case command.create.error.id:
      return {
        ...state,
        errorMessage,
      };

    case command.clearError.emit.id:
      return {
        ...state,
        errorMessage: undefined,
      };

    case command.statusChange.emit.id:
      return {
        ...state,
        status: {
          ...state.status,
          [id]: newStatus,
        },
      };
    case command.logsChange.emit.id:
      return {
        ...state,
        logs: {
          ...state.logs,
          [id]: [...(state.logs[id] || []), newLog],
        },
      };
    default:
      return state;
  }
}
