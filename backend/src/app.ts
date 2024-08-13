import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/users.route';
import sessionRoutes from './routes/session.routes';
import drinksRoutes from './routes/drinks.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import * as dotenv from 'dotenv';
import cors from 'cors'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());  

// Configuración de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'User and Drink API',
      version: '1.0.0',
      description: 'API for managing users and drinks',
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api`,
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            email: { type: 'string', example: 'user@example.com' },
            password: { type: 'string', example: 'password123' },
            username: { type: 'string', example: 'username' },
            name: { type: 'string', example: 'John' },
            lastname: { type: 'string', example: 'Doe' },
            age: { type: 'integer', example: 30 },
          },
          required: ['email', 'password', 'username', 'name', 'lastname', 'age'],
        },
        Drink: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Mojito' },
            description: { type: 'string', example: 'A refreshing cocktail' },
            rating: { type: 'integer', example: 4, minimum: 1, maximum: 5 },
            price: { type: 'number', example: 10.99 },
            discount: { type: 'number', example: 15 }, // porcentaje
            oldPrice: { type: 'number', example: 12.94 },
          },
          required: ['name', 'description', 'rating', 'price', 'discount', 'oldPrice'],
        },
      },
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};


const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/yourdatabase')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());

// Rutas
app.use('/api', userRoutes);
app.use('/api', sessionRoutes);
app.use('/api', drinksRoutes)

// Manejo de errores
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
