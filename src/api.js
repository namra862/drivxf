import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://drivx.onrender.com/api',
  timeout: 120000,
});

export default API;
