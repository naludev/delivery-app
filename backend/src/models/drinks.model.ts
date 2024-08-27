import mongoose, { Schema, Document } from 'mongoose';
import { IDrink } from '../interfaces/drink.interface';

const DrinkSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  price: { type: Number, required: true },
  discount: { type: Number },
  oldPrice: { type: Number},
  image: { data: Buffer, contentType: String },  
});

DrinkSchema.pre<IDrink>('save', function (next) {
  if (this.isModified('price') || this.isModified('discount')) {
    this.oldPrice = this.price / (1 - this.discount / 100);
  }
  next();
});

const DrinkModel = mongoose.model<IDrink>('Drink', DrinkSchema);
export default DrinkModel;
