import {
    FETCH_HOMES
} from '../actions/types';

// Returns previous state and replaces with newly returned payload from action

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_HOMES:
            return { ...state, [action.payload.id]: action.payload };
        default:
            return state;
    }
}