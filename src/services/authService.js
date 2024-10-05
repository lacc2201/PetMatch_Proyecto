import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

export const register = async (user) => {
  return axios.post(`${API_URL}/register`, user);
};

export const login = async (user) => {
  return axios.post(`${API_URL}/login`, user);
};
