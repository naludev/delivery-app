import axios from 'axios';
import { IUser } from '../../interfaces/user.interface';

const API_URL = "http://localhost:3000/api/users";

export const fetchUsersAPI = async (): Promise<IUser[]> => {
  const response = await axios.get<IUser[]>(API_URL);
  return response.data;
};

export const fetchUserByIdAPI = async (id: string): Promise<IUser> => {
  const response = await axios.get<IUser>(`${API_URL}/${id}`);
  return response.data;
};

export const createUserAPI = async (user: Partial<IUser>): Promise<IUser> => {
  const response = await axios.post<IUser>(API_URL, user);
  return response.data;
};

export const updateUserAPI = async (id: string, user: Partial<IUser>): Promise<IUser> => {
  const response = await axios.put<IUser>(`${API_URL}/${id}`, user);
  return response.data;
};

export const deleteUserAPI = async (id: string): Promise<void> => {
  await axios.delete<void>(`${API_URL}/${id}`);
};
