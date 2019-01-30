import { command } from '../action';

const initialState = {
    commands: {children: []}
};

export default function reducer(state = initialState, action) {
    const { type, commands } = action;
    switch (type) {
        case command.getAll.complete.id:
            return {
                ...state,
                commands,
            };
        default:
            return state;
    }
}
