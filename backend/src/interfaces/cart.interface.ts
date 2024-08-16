import mongoose, { Document } from 'mongoose';

export interface ICartItem extends Document {
  drinkId: mongoose.Types.ObjectId;
  quantity: number;
}
