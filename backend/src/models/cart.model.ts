import mongoose, { Document } from 'mongoose';
import { ICartItem } from '../interfaces/cart.interface';

const cartItemSchema = new mongoose.Schema<ICartItem>({
  drinkId: { type: mongoose.Schema.Types.ObjectId, ref: 'Drink', required: true },
  quantity: { type: Number, required: true },
});

export const CartItemModel = mongoose.model<ICartItem>('CartItem', cartItemSchema);
