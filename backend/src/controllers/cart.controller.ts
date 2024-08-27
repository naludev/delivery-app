import { Request, Response } from 'express';
import mongoose from 'mongoose';
import UserModel from '../models/users.model';
import { IDrink } from '../interfaces/drink.interface';
import { ICartItem } from '../interfaces/cart.interface';

const createCartItem = (drinkId: mongoose.Types.ObjectId, quantity: number): ICartItem => {
  return {
    _id: new mongoose.Types.ObjectId(),
    drinkId,
    quantity,
  } as ICartItem;
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { drinkId, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(drinkId)) {
      return res.status(400).json({ message: 'Invalid drinkId' });
    }

    const objectId = new mongoose.Types.ObjectId(drinkId);

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const itemIndex = user.cart.findIndex(item => item.drinkId.equals(objectId));
    if (itemIndex > -1) {
      user.cart[itemIndex].quantity += quantity;
    } else {
      user.cart.push(createCartItem(objectId, quantity));
    }

    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { drinkId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(drinkId)) {
      return res.status(400).json({ message: 'Invalid drinkId' });
    }

    const objectId = new mongoose.Types.ObjectId(drinkId);

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.cart = user.cart.filter(item => !item.drinkId.equals(objectId));
    
    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

interface PopulatedCartItem extends Omit<ICartItem, 'drinkId'> {
  drink: IDrink;
}


export const getCart = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id;
      const user = await UserModel.findById(userId).populate('cart.drinkId', 'name price description');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const cartItems = user.cart.map(item => {
        if (!item.drinkId) {
          return null;
        }
  
        const populatedItem = {
          _id: item._id,
          drink: item.drinkId as unknown as IDrink,
          quantity: item.quantity,
        } as PopulatedCartItem;
  
        const totalPrice = populatedItem.drink.price * populatedItem.quantity;
  
        return {
          _id: populatedItem._id,
          drinkId: populatedItem.drink._id,
          name: populatedItem.drink.name,
          price: totalPrice,
          quantity: populatedItem.quantity,
          description: populatedItem.drink.description,
          image: populatedItem.drink.image
        };
      }).filter(item => item !== null);
  
      const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
  
      res.status(200).json({ items: cartItems, totalPrice });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  export const getCartTotalQuantity = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id;
      const user = await UserModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const totalQuantity = user.cart.reduce((total, item) => total + item.quantity, 0);
  
      res.status(200).json({ totalQuantity });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const clearCart = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id;
  
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.cart = [];
      await user.save();
      res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const updateCartItemQuantity = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id;
      const { drinkId, quantity } = req.body;
  
      if (!mongoose.Types.ObjectId.isValid(drinkId)) {
        return res.status(400).json({ message: 'Invalid drinkId' });
      }
  
      if (quantity < 1) {
        return res.status(400).json({ message: 'Quantity must be at least 1' });
      }
  
      const objectId = new mongoose.Types.ObjectId(drinkId);
  
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const itemIndex = user.cart.findIndex(item => item.drinkId.equals(objectId));
      if (itemIndex > -1) {
        if (quantity === 0) {
          user.cart.splice(itemIndex, 1);
        } else {
          user.cart[itemIndex].quantity = quantity;
        }
      } else {
        return res.status(404).json({ message: 'Item not found in cart' });
      }
  
      await user.save();
      res.status(200).json(user.cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  