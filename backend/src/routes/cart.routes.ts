import * as express from 'express';
import { addToCart, removeFromCart, getCart, getCartTotalQuantity, clearCart, updateCartItemQuantity } from '../controllers/cart.controller';
import { isAuthenticated } from '../controllers/session.controller';

const router = express.Router();

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add a drink to the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               drinkId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Drink added to the cart
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post('/cart', isAuthenticated, addToCart);

/**
 * @swagger
 * /cart:
 *   delete:
 *     summary: Remove a drink from the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               drinkId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Drink removed from the cart
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.delete('/cart', isAuthenticated, removeFromCart);

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get the user's cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Successfully retrieved the cart
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get('/cart', isAuthenticated, getCart);

/**
 * @swagger
 * /cart/total-quantity:
 *   get:
 *     summary: Get the total quantity of items in the user's cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Successfully retrieved the total quantity
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get('/cart/total-quantity', isAuthenticated, getCartTotalQuantity);

/**
 * @swagger
 * /cart/clear:
 *   delete:
 *     summary: Clear all items from the cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.delete('/cart/clear', isAuthenticated, clearCart);

/**
 * @swagger
 * /cart/update:
 *   put:
 *     summary: Update the quantity of a drink in the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               drinkId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *       400:
 *         description: Invalid request or quantity too low
 *       404:
 *         description: User or item not found
 *       500:
 *         description: Server error
 */
router.put('/cart/update', isAuthenticated, updateCartItemQuantity);


export default router;
