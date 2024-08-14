import axios from 'axios';

const API_URL = "http://localhost:3000/api";

export const loginAPI = async (credentials: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

export const logoutAPI = async () => {
  const response = await axios.post(`${API_URL}/logout`, {}, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
  return response.data;
};

export const checkSessionStatusAPI = async () => {
    const response = await axios.get(`${API_URL}/session/status`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
    return response.data;
  };