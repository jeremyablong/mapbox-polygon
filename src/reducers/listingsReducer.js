import {
    FETCH_LISTINGS
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_LISTINGS:
            return { ...state, [action.payload.id]: action.payload };
        default:
            return state;
    }
}