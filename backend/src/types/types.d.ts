import { MulterFile } from 'multer'; // Importa Multer si no lo tienes

declare module 'express-serve-static-core' {
    interface Request {
      file?: MulterFile;  // Permite que `file` sea opcional en la Request
    }
  }