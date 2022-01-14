import axios from "axios";
import store from "../store.js";

const instance = axios.create({
  baseURL: "http://localhost:7000",
  withCredentials: true,
});

instance.interceptors.response.use(
  function (response) {
    const { alert } = response.data;
    if (alert) {
      store.dispatch({ type: "SHOW_ALERT", payload: alert });
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
