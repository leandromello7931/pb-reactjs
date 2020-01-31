import axios from 'axios';

const api = axios.create({baseURL:'https://backend-pb.herokuapp.com'});

export default api;
