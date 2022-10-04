import axios from "axios";
import store from "../stores/index";
import { showLoading, hideLoading } from "react-redux-loading-bar";

const url = {
  baseUrl: "https://restfulapi.dnd-group.net/api",
  login: "/login",
  major: "/majors",
  instructor: "/instructors",
  student: "/students",
};
const instance = axios.create({
  baseURL: url.baseUrl,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

instance.interceptors.request.use((request) => {
  const state = store.getState();
  if (state.auth.token) {
    request.headers.Authorization = `Bearer ${state.auth.token}`;
  }
  store.dispatch(showLoading());
  return request;
});
instance.interceptors.response.use(
  (response) => {
    setTimeout(() => {
      store.dispatch(hideLoading());
    }, 100);
    return response;
  },
  (error) => {
    setTimeout(() => {
      store.dispatch(hideLoading());
    }, 100);
    if (!error.response || error.response.status === 0) {
      window.location.href = "/network-error";
    } else {
      switch (error.response.status) {
        case 401:
          window.location.href = "/login";
          break;
        case 403:
          window.location.href = "/no-permission";
          break;
        default:
          break;
      }
      return Promise.reject(error);
    }
  }
);

const api = {
  url: url,
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
};
export default api;
