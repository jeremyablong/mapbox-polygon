import listings from '../apis/listings';
import polygon from '../apis/polygon';
import history from '../history';
import {
    FETCH_HOMES,
    FETCH_HOME
} from './types';

export const fetchHomes = () => async dispatch => {
    const response = await polygon.get('?polygon=-88.774948,42.458859;-86.432490,42.458859;-86.432490,41.081374;-88.774948,41.081374');

    dispatch({ type: FETCH_HOMES, payload: response.data });
}

export const fetchHome = (id) => async dispatch => {
    const response = await listings.get(`/${id}`);

    dispatch({ type: FETCH_HOME, payload: response.data });
}