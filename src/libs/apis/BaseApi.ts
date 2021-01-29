import axios from 'axios';
import vm from '@/main';

const api = axios.create({
  baseURL: process.env.VUE_APP_APIPATH,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: {
      toString() {
        return vm.$cookies.get('token');
      },
    },
  },
});

api.interceptors.response.use((response) => response, (error) => {
  let path = '';
  switch (error.response.status) {
    case 401: path = '/loginpage'; break;
    case 403: path = '/403'; break;
    default: break;
  }
  if (path !== '' && vm.$router.currentRoute.path !== path) {
    vm.$router.push(path);
  }
  return Promise.reject(error);
});

export const getToken = () => {
  if (vm.$cookies.isKey('token')) {
    return vm.$cookies.get('token');
  }
  vm.$router.push('/loginpage');
  throw new Error('token not found');
};

export default api;
