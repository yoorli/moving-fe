import axios from 'axios';
import { ENV } from './STORAGE_KEY';

export const auth = axios.create({
  baseURL: `${ENV.API_REACT_APP}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
