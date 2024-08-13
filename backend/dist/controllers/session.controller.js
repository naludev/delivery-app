"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = exports.logout = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_model_1 = __importDefault(require("../models/users.model"));
// Manejo de inicio de sesión
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
        // Crear el token de sesión
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '1h', // Token expira en 1 hora
        });
        return res.status(200).json({ token }); // Asegúrate de devolver una respuesta aquí
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error' }); // Asegúrate de devolver una respuesta aquí
    }
};
exports.login = login;
// Manejo de cierre de sesión
const logout = (req, res) => {
    // El cierre de sesión puede implicar la invalidación del token en el frontend
    // Si mantienes una lista de tokens inválidos en el backend, puedes agregar lógica aquí
    return res.status(200).json({ message: 'Logged out successfully' }); // Asegúrate de devolver una respuesta aquí
};
exports.logout = logout;
// Middleware para verificar autenticación
//@ts-ignore
const isAuthenticated = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secret');
        req.user = decoded; // `decoded` es de tipo JwtPayload, asegúrate de que req.user sea del tipo adecuado
        next(); // Llama a next() para pasar al siguiente middleware o controlador
    }
    catch (error) {
        return res.status(401).json({ message: 'Token is not valid' }); // Asegúrate de devolver una respuesta aquí
    }
};
exports.isAuthenticated = isAuthenticated;
