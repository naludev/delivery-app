"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const users_model_1 = __importDefault(require("../models/users.model"));
// Crear un nuevo usuario
const createUser = async (req, res) => {
    try {
        const newUser = new users_model_1.default(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch (error) {
        //@ts-ignore
        res.status(400).json({ message: error.message });
    }
};
exports.createUser = createUser;
// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await users_model_1.default.find();
        res.status(200).json(users);
    }
    catch (error) {
        //@ts-ignore
        res.status(500).json({ message: error.message });
    }
};
exports.getAllUsers = getAllUsers;
// Obtener un usuario por ID
const getUserById = async (req, res) => {
    try {
        const user = await users_model_1.default.findById(req.params.id);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        //@ts-ignore
        res.status(500).json({ message: error.message });
    }
};
exports.getUserById = getUserById;
// Actualizar un usuario por ID
const updateUserById = async (req, res) => {
    try {
        const updatedUser = await users_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedUser) {
            res.status(200).json(updatedUser);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        //@ts-ignore
        res.status(400).json({ message: error.message });
    }
};
exports.updateUserById = updateUserById;
// Eliminar un usuario por ID
const deleteUserById = async (req, res) => {
    try {
        const deletedUser = await users_model_1.default.findByIdAndDelete(req.params.id);
        if (deletedUser) {
            res.status(200).json({ message: 'User deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        //@ts-ignore
        res.status(500).json({ message: error.message });
    }
};
exports.deleteUserById = deleteUserById;
