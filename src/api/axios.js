// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dsa-backend-ikrj.onrender.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
