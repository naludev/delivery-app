import axios from 'axios';
import { Drink } from '@interfaces/drink.interface';

const API_URL = "http://localhost:3000/api/drinks";

export const fetchDrinksAPI = async (): Promise<Drink[]> => {
  const response = await axios.get<Drink[]>(API_URL);
  return response.data;
};
