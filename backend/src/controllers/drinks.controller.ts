import { Request, Response } from 'express';
import DrinkModel from '../models/drinks.model';

export const createDrink = async (req: Request, res: Response) => {
  try {
    const newDrink = new DrinkModel(req.body);
    await newDrink.save();
    res.status(201).json(newDrink);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllDrinks = async (req: Request, res: Response) => {
  try {
    const drinks = await DrinkModel.find();
    res.status(200).json(drinks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDrinkById = async (req: Request, res: Response) => {
  try {
    const drink = await DrinkModel.findById(req.params.id);
    if (drink) {
      res.status(200).json(drink);
    } else {
      res.status(404).json({ message: 'Drink not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDrinkById = async (req: Request, res: Response) => {
  try {
    const updatedDrink = await DrinkModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedDrink) {
      res.status(200).json(updatedDrink);
    } else {
      res.status(404).json({ message: 'Drink not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const removeDrinkById = async (req: Request, res: Response) => {
    try {
      const deletedDrink = await DrinkModel.findByIdAndRemove(req.params.id);
      if (deletedDrink) {
        res.status(200).json({ message: 'Drink deleted successfully' });
      } else {
        res.status(404).json({ message: 'Drink not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
