import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    // response error handle
    if (error.response) {
      console.error('error.response', error.response.data);
      return Promise.reject({
        message: error.response?.data.message,
        status: error.response?.status,
      });
    }

    //request error handle
    if (error.request) {
      console.error('error.request', error.request);
      return Promise.reject({ message: error.request?.responseText });
    }

    console.error('error', error.message);

    return Promise.reject(error);
  },
);

export default instance;
