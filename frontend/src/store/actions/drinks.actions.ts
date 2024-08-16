import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDrinksAPI } from '@api/drinks.api';
import { Drink } from '@interfaces/drink.interface';

export const fetchDrinks = createAsyncThunk<Drink[], void>(
  'drinks/fetchDrinks',
  async () => {
    return await fetchDrinksAPI();
  }
);
