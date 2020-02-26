import listings from '../apis/listings';
import polygon from '../apis/polygon';
import {
    FETCH_HOMES,
    FETCH_HOME
} from './types';

// Fetchs Data for single listing
// Route = /homes/details/:id
export const fetchHome = (id) => async dispatch => {
    const response = await listings.get(`/${id}`);
    const photoCount = response.data.item.PHOTOCOUNT;
    let imageUrls = ['https://photos.mredllc.com/photos/property/' + id.slice(5) + '/' + id + '.jpg'];
    for (let i = 1; i < photoCount; i++){
        imageUrls.push('https://photos.mredllc.com/photos/property/' + id.slice(5) + '/' + id + '_' + i + '.jpg');
    }
    response.imageUrls = imageUrls;

    dispatch({ type: FETCH_HOME, payload: response });
}

// Calls polygon API function from params specified, then returns all home results as list
// Route = /homes
export const fetchHomes = (currentPage, limit) => async dispatch => {
    const defaultData = {
        polygon: '-88.774948,42.458859;-86.432490,42.458859;-86.432490,41.081374;-88.774948,41.081374',
        proptype: 'condominium'
    };
    const response = await polygon.get('/qps', {params: defaultData});
    
    const totalItems = response.data.items.length;
    const totalPages = Math.ceil(totalItems / limit);

    const indexOfLastPost = currentPage * limit;
    const indexOfFirstPost = indexOfLastPost - limit;

    const polyResponse = response.data.items.slice(indexOfFirstPost, indexOfLastPost);

    const listingsData = await Promise.all(
        polyResponse.map(async data => {
            const ln = data.item.LN;
            const lnLast3 = ln.slice(ln.length - 3);
            let homesResponse = await listings.get(ln);
            const photoCount = homesResponse.data.item.PHOTOCOUNT;
            let imageUrls = ['https://photos.mredllc.com/photos/property/' + lnLast3 + '/' + ln + '.jpg'];
            for (let i = 1; i < photoCount; i++){
                imageUrls.push('https://photos.mredllc.com/photos/property/' + lnLast3 + '/' + ln + '_' + i + '.jpg');
            }
            homesResponse.imageUrls = imageUrls;
            return homesResponse;
        })
    )
    listingsData.totalItems = totalItems;
    listingsData.totalPages = totalPages;
    listingsData.start = indexOfFirstPost;
    listingsData.end = indexOfLastPost;

    dispatch({ type: FETCH_HOMES, payload: listingsData });
}