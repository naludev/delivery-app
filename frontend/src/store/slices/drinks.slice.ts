import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../config';
import { fetchDrinks } from '../actions/drinks.actions';
import { Drink } from '../../interfaces/drink.interface';

interface DrinksState {
  drinks: Drink[];
  loading: boolean;
  error: string | null;
}

const initialState: DrinksState = {
  drinks: [],
  loading: false,
  error: null,
};

const drinksSlice = createSlice({
  name: 'drinks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrinks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDrinks.fulfilled, (state, action) => {
        state.loading = false;
        state.drinks = action.payload;
      })
      .addCase(fetchDrinks.rejected, (state) => {
        state.loading = false;
        state.error = "Error fetching drinks.";
      });
  },
});

export const selectDrinks = (state: RootState) => state.drinks.drinks;
export const selectLoading = (state: RootState) => state.drinks.loading;
export const selectError = (state: RootState) => state.drinks.error;

export default drinksSlice.reducer;

