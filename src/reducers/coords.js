import { COORDS } from '../actions/types';

// Returns previous state and replaces with newly returned payload from action

export default (state = {}, action) => {
    switch (action.type) {
        case COORDS:
            return { 
				...state, 
				lat: action.lat,
				lng: action.lng
            };
        default:
            return state;
    }
}