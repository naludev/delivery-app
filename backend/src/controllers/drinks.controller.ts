import { Request, Response } from 'express';
import DrinkModel from '../models/drinks.model';
import sharp from 'sharp';

export const createDrink = async (req: Request, res: Response) => {
  try {
    const { name, description, rating, price, discount } = req.body;
    //@ts-ignore
    const image = req.file;
    let processedImageBuffer;


    if (image) {
      processedImageBuffer = await sharp(image.buffer)
        .resize({ width: 800 })
        .jpeg({ quality: 80 })
        .toBuffer();
    }

    const newDrink = new DrinkModel({
      name,
      description,
      rating,
      price,
      discount,
      image: {
        data: processedImageBuffer || image?.buffer,
        contentType: image?.mimetype,
      }
    });

    await newDrink.save();
    res.status(201).json(newDrink);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllDrinks = async (req: Request, res: Response) => {
  try {
    const drinks = await DrinkModel.find({});
    const drinksWithImages = drinks.map(drink => ({
      _id: drink._id,
      name: drink.name,
      description: drink.description,
      rating: drink.rating,
      price: drink.price,
      discount: drink.discount,
      oldPrice: drink.oldPrice,
      image: drink.image?.data 
        ? `data:${drink.image.contentType};base64,${drink.image.data.toString('base64')}` 
        : null,
    }));
    res.status(200).json(drinksWithImages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDrinkById = async (req: Request, res: Response) => {
  try {
    const drink = await DrinkModel.findById(req.params.id);
    if (drink) {
      const drinkWithImage = {
        _id: drink._id,
        name: drink.name,
        description: drink.description,
        rating: drink.rating,
        price: drink.price,
        discount: drink.discount,
        oldPrice: drink.oldPrice,
        image: `data:${drink.image.contentType};base64,${drink.image.data.toString('base64')}`,
      };
      res.status(200).json(drinkWithImage);
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
