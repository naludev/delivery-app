import mongoose, { Document } from 'mongoose';

export interface IDrink extends Document {
  name: string;
  description: string;
  rating: number;
  price: number;
  discount: number;
  oldPrice: number;
}
