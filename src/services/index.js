import axios from 'axios';
import store from 'store';

const instance = axios.create({
  baseURL: 'http://localhost:7000',
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => {
    const { alert } = response.data;
    if (alert) {
      store.dispatch({ type: 'SHOW_ALERT', payload: alert });
    }
    return response;
  },
  (error) => Promise.reject(error),
);

export default instance;
