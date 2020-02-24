import axios from 'axios';

// Base URL for API requests to Swagger API

export default axios.create({
    baseURL: 'http://18.216.141.175:3222'
});