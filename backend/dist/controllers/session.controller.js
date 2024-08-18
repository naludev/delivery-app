"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSessionStatus = exports.isAuthenticated = exports.logout = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_model_1 = __importDefault(require("../models/users.model"));
const revokedTokens = new Set();
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await users_model_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '1h',
        });
        return res.status(200).json({ token, userId: user._id });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.login = login;
const logout = (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token) {
        revokedTokens.add(token);
    }
    return res.status(200).json({ message: 'Logged out successfully' });
};
exports.logout = logout;
const isAuthenticated = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token || revokedTokens.has(token)) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secret');
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
};
exports.isAuthenticated = isAuthenticated;
const checkSessionStatus = (req, res) => {
    return res.status(200).json({ message: 'User is logged in' });
};
exports.checkSessionStatus = checkSessionStatus;
