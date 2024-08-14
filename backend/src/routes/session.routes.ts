import * as express from 'express';
import { login, logout, isAuthenticated, checkSessionStatus } from '../controllers/session.controller';

const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Server error
 */
router.post('/login', login);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Log out a user
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: Successfully logged out
 */
router.post('/logout', isAuthenticated, logout);

/**
 * @swagger
 * /session/status:
 *   get:
 *     summary: Check if the user is logged in
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: User is logged in
 *       401:
 *         description: User is not logged in
 */
router.get('/session/status', isAuthenticated,checkSessionStatus);

export default router;
