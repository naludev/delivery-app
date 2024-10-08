import express from 'express';
import {
  createDrink,
  getAllDrinks,
  getDrinkById,
  updateDrinkById,
  removeDrinkById
} from '../controllers/drinks.controller';
import multer from 'multer';

const router = express.Router();

/**
 * @swagger
 * /drinks:
 *   post:
 *     summary: Create a new drink
 *     tags: [Drinks]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the drink
 *               description:
 *                 type: string
 *                 description: Description of the drink
 *               rating:
 *                 type: number
 *                 description: Rating of the drink (1-5)
 *               price:
 *                 type: number
 *                 description: Price of the drink
 *               discount:
 *                 type: number
 *                 description: Discount percentage for the drink
 *               oldPrice:
 *                 type: number
 *                 description: Old price of the drink
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image of the drink
 *     responses:
 *       201:
 *         description: Drink created successfully
 *       400:
 *         description: Bad request
 */
const storage = multer.memoryStorage(); // Usar memoria para almacenar la imagen temporalmente como Buffer
const upload = multer({ storage });
router.post('/drinks', upload.single('image'), createDrink);

/**
 * @swagger
 * /drinks:
 *   get:
 *     summary: Get all drinks
 *     tags: [Drinks]
 *     responses:
 *       200:
 *         description: Successfully retrieved drinks
 *       500:
 *         description: Internal server error
 */
router.get('/drinks', getAllDrinks);

/**
 * @swagger
 * /drinks/{id}:
 *   get:
 *     summary: Get a drink by ID
 *     tags: [Drinks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Drink ID
 *     responses:
 *       200:
 *         description: Successfully retrieved drink
 *       404:
 *         description: Drink not found
 *       500:
 *         description: Internal server error
 */
router.get('/drinks/:id', getDrinkById);

/**
 * @swagger
 * /drinks/{id}:
 *   put:
 *     summary: Update a drink by ID
 *     tags: [Drinks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Drink ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Drink'
 *     responses:
 *       200:
 *         description: Drink updated successfully
 *       404:
 *         description: Drink not found
 *       400:
 *         description: Bad request
 */
router.put('/drinks/:id', updateDrinkById);

/**
 * @swagger
 * /drinks/{id}:
 *   delete:
 *     summary: Delete a drink by ID
 *     tags: [Drinks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Drink ID
 *     responses:
 *       200:
 *         description: Drink deleted successfully
 *       404:
 *         description: Drink not found
 *       500:
 *         description: Internal server error
 */
router.delete('/drinks/:id', removeDrinkById);

export default router;
