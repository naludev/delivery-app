// src/actions/cart.actions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCartAPI, addToCartAPI, removeFromCartAPI, updateCartQuantityAPI, fetchCartTotalQuantityAPI, clearCartAPI } from '../api/cart.api';
import { ICartItem } from '../../interfaces/cart.interface';

export const fetchCart = createAsyncThunk<ICartItem[]>(
  'cart/fetchCart',
  async () => {
    return await fetchCartAPI();
  }
);

interface AddToCartPayload {
  drinkId: string;
  quantity: number;
}

export const addToCart = createAsyncThunk<ICartItem[], AddToCartPayload>(
  'cart/addToCart',
  async ({ drinkId, quantity }: AddToCartPayload) => {
    return await addToCartAPI(drinkId, quantity);
  }
);

export const removeFromCart = createAsyncThunk<ICartItem[], string>(
  'cart/removeFromCart',
  async (drinkId: string) => {
    return await removeFromCartAPI(drinkId);
  }
);

export const updateCartQuantity = createAsyncThunk<ICartItem[], { drinkId: string, quantity: number }>(
  'cart/updateCartQuantity',
  async ({ drinkId, quantity }) => {
    return await updateCartQuantityAPI(drinkId, quantity);
  }
);

export const fetchCartTotalQuantity = createAsyncThunk<number>(
  'cart/fetchCartTotalQuantity',
  async () => {
    return await fetchCartTotalQuantityAPI();
  }
);

export const clearCart = createAsyncThunk<void>(
  'cart/clearCart',
  async () => {
    await clearCartAPI();
  }
);
