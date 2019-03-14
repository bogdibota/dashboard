import { command } from '../action';

const initialState = {
  commands: {children: []},
  status: {},
  selectedCommand: undefined,
  errorMessage: undefined,
};

export default function reducer(state = initialState, action) {
  const {type, commands, selectedCommand, errorMessage, id, newStatus} = action;
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
    default:
      return state;
  }
}
