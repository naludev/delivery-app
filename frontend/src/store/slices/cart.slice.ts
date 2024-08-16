import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../config';
import { ICartItem } from '@interfaces/cart';
import { fetchCart, addToCart, removeFromCart, fetchCartTotalQuantity, clearCart, updateCartQuantity } from '@actions/cart.actions';

interface CartState {
  cart: ICartItem[];
  loading: boolean;
  error: string | null;
  totalQuantity: number;
}

const initialState: CartState = {
  cart: [],
  loading: false,
  error: null,
  totalQuantity: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    calculateTotalQuantity: (state) => {
      state.totalQuantity = state.cart.reduce((total, item) => total + item.quantity, 0);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.loading = false;
        state.error = "Error fetching cart.";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(fetchCartTotalQuantity.fulfilled, (state, action) => {
        state.totalQuantity = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cart = [];
        state.totalQuantity = 0;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.totalQuantity = state.cart.reduce((total, item) => total + item.quantity, 0);
      });
  },
});

export const { calculateTotalQuantity } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart.cart;
export const selectCartLoading = (state: RootState) => state.cart.loading;
export const selectCartError = (state: RootState) => state.cart.error;
export const selectCartTotalQuantity = (state: RootState) => state.cart.totalQuantity;

export default cartSlice.reducer;
