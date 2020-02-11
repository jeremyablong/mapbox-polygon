import listings from '../apis/listings';
import polygon from '../apis/polygon';
import history from '../history';
import {
    FETCH_HOMES,
    FETCH_HOME,
    FETCH_LISTINGS
} from './types';

async function fetchData(limit) {
    const response = await polygon.get('/qps', {
        params: {
            polygon: '-88.774948,42.458859;-86.432490,42.458859;-86.432490,41.081374;-88.774948,41.081374',
            proptype: 'condominium',
            limit: limit
        }
    });

    return response;
}

export const fetchListings = () => async dispatch => {
    const response = await fetchData();

    dispatch({ type: FETCH_LISTINGS, payload: response.data });
}

export const fetchHome = (id) => async dispatch => {
    const response = await listings.get(`/${id}`);
    const photoCount = response.data.item.PHOTOCOUNT;
    let imageUrls = ['http://photos.mredllc.com/photos/property/' + id.slice(5) + '/' + id + '.jpg'];
    for (let i = 1; i < photoCount; i++){
        imageUrls.push('http://photos.mredllc.com/photos/property/' + id.slice(5) + '/' + id + '_' + i + '.jpg');
    }
    response.imageUrls = imageUrls;

    dispatch({ type: FETCH_HOME, payload: response });
}

export const fetchHomes = (limit) => async dispatch => {
    const response = await fetchData();
    const totalItems = response.data.items.length;
    const totalPages = Math.ceil(totalItems / limit);
    const polyResponse = response.data.items.slice(0, limit)

    const listingsData = await Promise.all(
        polyResponse.map(async data => {
            const ln = data.item.LN;
            const lnLast3 = ln.slice(ln.length - 3);
            let homesResponse = await listings.get(ln);
            const photoCount = homesResponse.data.item.PHOTOCOUNT;
            let imageUrls = ['http://photos.mredllc.com/photos/property/' + lnLast3 + '/' + ln + '.jpg'];
            for (let i = 1; i < photoCount; i++){
                imageUrls.push('http://photos.mredllc.com/photos/property/' + lnLast3 + '/' + ln + '_' + i + '.jpg');
            }
            homesResponse.imageUrls = imageUrls;
            return homesResponse;
        })
    )
    listingsData.totalItems = totalItems;
    listingsData.totalPages = totalPages;

    dispatch({ type: FETCH_HOMES, payload: listingsData });
}