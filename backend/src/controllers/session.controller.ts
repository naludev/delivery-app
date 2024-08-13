import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import userModel from '../models/users.model';

// Manejo de inicio de sesión
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
  
      // Crear el token de sesión
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '1h', // Token expira en 1 hora
      });
  
      return res.status(200).json({ token }); // Asegúrate de devolver una respuesta aquí
    } catch (error) {
      return res.status(500).json({ message: 'Server error' }); // Asegúrate de devolver una respuesta aquí
    }
  };
  

// Manejo de cierre de sesión
export const logout = (req: Request, res: Response) => {
  // El cierre de sesión puede implicar la invalidación del token en el frontend
  // Si mantienes una lista de tokens inválidos en el backend, puedes agregar lógica aquí
  return res.status(200).json({ message: 'Logged out successfully' }); // Asegúrate de devolver una respuesta aquí
};

// Middleware para verificar autenticación
//@ts-ignore
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as JwtPayload;
      (req as any).user = decoded; // `decoded` es de tipo JwtPayload, asegúrate de que req.user sea del tipo adecuado
      next(); // Llama a next() para pasar al siguiente middleware o controlador
    } catch (error) {
      return res.status(401).json({ message: 'Token is not valid' }); // Asegúrate de devolver una respuesta aquí
    }
  };
  
