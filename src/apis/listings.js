import axios from 'axios';

export default axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/http://18.216.141.175:3000/database/mls',
});