import listings from '../apis/listings';
import polygon from '../apis/polygon';
import images from '../apis/images';
import history from '../history';
import {
    FETCH_HOMES,
    FETCH_HOME,
    FETCH_IMAGE
} from './types';

export const fetchHome = (id) => async dispatch => {
    const response = await listings.get(`/${id}`);

    dispatch({ type: FETCH_HOME, payload: response.data });
}

export const fetchImage = (folder, id) => async dispatch => {
    const response = await images.get(`/${folder}/${id}_1.jpg`);

    dispatch({ type: FETCH_IMAGE, payload: response.headers });
}

export const fetchHomes = (limit) => async dispatch => {
    const polyResponse = await polygon.get('?polygon=-88.774948,42.458859;-86.432490,42.458859;-86.432490,41.081374;-88.774948,41.081374' + '&limit=' + limit);

    const listingsData = await Promise.all(
        polyResponse.data.items.map(async data => {
            let homesResponse = await listings.get(data.item.LN);
            return homesResponse;
        })
    )

    dispatch({ type: FETCH_HOMES, payload: listingsData });
}