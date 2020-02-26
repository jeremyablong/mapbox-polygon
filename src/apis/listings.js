import axios from 'axios';

// Base URL for API requests for details of home listings

export default axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://ftlsugcyt6.execute-api.us-east-2.amazonaws.com/dev',
});