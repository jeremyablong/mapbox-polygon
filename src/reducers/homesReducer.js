import {
    FETCH_HOME
} from '../actions/types';

// Returns previous state and replaces with newly returned payload from action

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_HOME:
            return { ...state, [action.payload.id]: action.payload };
        default:
            return state;
    }
}