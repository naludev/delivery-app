import mongoose, { Schema, Document } from 'mongoose';

export interface IDrink extends Document {
  name: string;
  description: string;
  rating: number; // del 1 al 5
  price: number;
  discount: number; // porcentaje de descuento
  oldPrice: number;
}

const DrinkSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  price: { type: Number, required: true },
  discount: { type: Number, required: true },
  oldPrice: { type: Number, required: true },
});

// Calcular oldPrice antes de guardar el drink
DrinkSchema.pre<IDrink>('save', function (next) {
  if (this.isModified('price') || this.isModified('discount')) {
    this.oldPrice = this.price / (1 - this.discount / 100);
  }
  next();
});

const DrinkModel = mongoose.model<IDrink>('Drink', DrinkSchema);
export default DrinkModel;
