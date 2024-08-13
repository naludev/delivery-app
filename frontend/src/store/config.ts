import { configureStore } from '@reduxjs/toolkit';
import drinksReducer from './slices/drinks.slice';

export const store = configureStore({
  reducer: {
    drinks: drinksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;  // Asegúrate de exportar el tipo AppDispatch
