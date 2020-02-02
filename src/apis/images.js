import axios from 'axios';

export default axios.create({
    baseURL: 'http://photos.mredllc.com/photos/property/',
});