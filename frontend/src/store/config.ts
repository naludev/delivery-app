import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/users.slice';
import drinksReducer from './slices/drinks.slice';
import sessionReducer from './slices/session.slice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    drinks: drinksReducer,
    session: sessionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
