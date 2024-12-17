import axios from 'axios';

export const auth = axios.create({
  baseURL: 'https://moving-be-render.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
