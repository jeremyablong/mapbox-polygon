import axios from 'axios';

// Base URL for API requests for details of home listings

export default axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/http://18.216.141.175:3000/database/mls',
});