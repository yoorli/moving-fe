import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// axios 에러 핸들링 여기서?

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
