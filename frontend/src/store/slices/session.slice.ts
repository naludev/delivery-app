import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, logout as logoutAPI, checkSessionStatus } from '@actions/session.actions';
import { RootState } from '../config';

interface SessionState {
  token: string | null;
  loading: boolean;
  error: string | null;
  sessionStatus: string | null;
}

const initialState: SessionState = {
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
  sessionStatus: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.token = action.payload;
        localStorage.setItem('token', action.payload);
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error logging in';
      })
      .addCase(logoutAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutAPI.fulfilled, (state) => {
        state.loading = false;
        state.token = null;
        localStorage.removeItem('token');
        state.error = null;
      })
      .addCase(logoutAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error logging out';
      })
      .addCase(checkSessionStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkSessionStatus.fulfilled, (state, action: PayloadAction<{ message: string }>) => {
        state.loading = false;
        state.sessionStatus = action.payload.message;
        if (action.payload.message === 'Token is not valid') {
          state.token = null;
          localStorage.removeItem('token');
        }
        state.error = null;
      })
      .addCase(checkSessionStatus.rejected, (state, action) => {
        state.loading = false;
        state.sessionStatus = null;
        state.error = action.error.message || 'Error checking session status';
      });
  },
});

export const { actions, reducer } = sessionSlice;

export const selectToken = (state: RootState) => state.session.token;
export const selectLoading = (state: RootState) => state.session.loading;
export const selectError = (state: RootState) => state.session.error;
export const selectSessionStatus = (state: RootState) => state.session.sessionStatus;

export const { logout } = actions;

export default reducer;
