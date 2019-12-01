import axios from 'axios';

const api = axios.create({
  baseURL: 'https://turitando.herokuapp.com/', 
});

export default api;