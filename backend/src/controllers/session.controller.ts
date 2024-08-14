import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import userModel from '../models/users.model';

const revokedTokens: Set<string> = new Set();

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '1h',
        });

        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};

export const logout = (req: Request, res: Response) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token) {
        revokedTokens.add(token);
    }
    return res.status(200).json({ message: 'Logged out successfully' });
};

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token || revokedTokens.has(token)) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as JwtPayload;
        (req as any).user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

export const checkSessionStatus = (req: Request, res: Response) => {
    return res.status(200).json({ message: 'User is logged in' });
};
