import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToastState {
  message: string | null;
  visible: boolean;
}

const initialState: ToastState = {
  message: null,
  visible: false,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.visible = true;
    },
    hideToast: (state) => {
      state.message = null;
      state.visible = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;

export const showToastWithTimeout = (message: string) => (dispatch: any) => {
  dispatch(showToast(message));

  setTimeout(() => {
    dispatch(hideToast());
  }, 4000);
};

export const selectToast = (state: { toast: ToastState }) => state.toast;

export default toastSlice.reducer;
