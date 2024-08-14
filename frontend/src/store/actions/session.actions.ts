import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI, logoutAPI, checkSessionStatusAPI } from '../api/session.api';

export const login = createAsyncThunk(
  'session/login',
  async (credentials: { email: string; password: string }) => {
    const response = await loginAPI(credentials);
    return response.token;
  }
);

export const logout = createAsyncThunk(
  'session/logout',
  async () => {
    await logoutAPI();
    return null;
  }
);

export const checkSessionStatus = createAsyncThunk(
    'session/checkStatus',
    async () => {
      const response = await checkSessionStatusAPI();
      return response;
    }
  );