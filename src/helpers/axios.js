import axios from 'axios';

const clientAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`, // URL base de axios
});

clientAxios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('qv_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, function (error) {
    // Do something if get an error
    console.log(error)
    return Promise.reject(error);
  });

export default clientAxios;