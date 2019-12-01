import axios from 'axios';

const api = axios.create({
  baseURL: 'https://turistando.herokuapp.com/', 
});

export default api;