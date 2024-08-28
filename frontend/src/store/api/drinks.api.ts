import axios from 'axios';
import { Drink } from '@interfaces/drink';

const API_URL = "https://delivery-app-ocim.onrender.com/api/drinks";

export const fetchDrinksAPI = async (): Promise<Drink[]> => {
  const response = await axios.get<Drink[]>(API_URL);
  return response.data;
};
