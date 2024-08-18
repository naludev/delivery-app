import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI, logoutAPI, checkSessionStatusAPI } from '@api/session.api';
import { showToastWithTimeout } from '@slices/toast.slice';

export const login = createAsyncThunk(
  'session/login',
  async (credentials: { email: string; password: string }, { dispatch }) => {
    const response = await loginAPI(credentials);
    localStorage.setItem('userId', response.userId);
    dispatch(showToastWithTimeout('Has iniciado sesión correctamente'));
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