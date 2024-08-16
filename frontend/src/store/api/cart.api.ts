// src/api/cart.api.ts
import axios from 'axios';
import { ICartItem } from '@interfaces/cart';

const API_URL = "http://localhost:3000/api/cart";

export const fetchCartAPI = async (): Promise<ICartItem[]> => {
  const response = await axios.get<ICartItem[]>(`${API_URL}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`} });
  return response.data;
};

export const addToCartAPI = async (drinkId: string, quantity: number): Promise<ICartItem[]> => {
  const response = await axios.post<ICartItem[]>(`${API_URL}`, { drinkId, quantity }, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`} });
  return response.data;
};

export const removeFromCartAPI = async (drinkId: string): Promise<ICartItem[]> => {
  const token = localStorage.getItem('token');
  const response = await axios.delete<ICartItem[]>(API_URL, {
    data: { drinkId },
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.data;
};

export const updateCartQuantityAPI = async (drinkId: string, quantity: number): Promise<ICartItem[]> => {
  const response = await axios.put<ICartItem[]>(`${API_URL}/update`, { drinkId, quantity }, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`} });
  return response.data;
};

export const fetchCartTotalQuantityAPI = async (): Promise<number> => {
  const response = await axios.get<{ totalQuantity: number }>(`${API_URL}/total-quantity`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data.totalQuantity;
};

export const clearCartAPI = async (): Promise<void> => {
  const token = localStorage.getItem('token');
  await axios.delete(`${API_URL}/clear`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};
