import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { ICartItem } from '../interfaces/cart.interface';
import { CartItemModel } from './cart.model';

export interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  name: string;
  lastname: string;
  adult: boolean;
  cart: ICartItem[];
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  adult: { type: Boolean, required: true },
  cart: [CartItemModel.schema],
});

UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const userModel = mongoose.model<IUser>('User', UserSchema);
export default userModel;