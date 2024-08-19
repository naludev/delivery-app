"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_route_1 = __importDefault(require("./routes/users.route"));
const session_routes_1 = __importDefault(require("./routes/session.routes"));
const drinks_routes_1 = __importDefault(require("./routes/drinks.routes"));
const cart_routes_1 = __importDefault(require("./routes/cart.routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use((0, cors_1.default)(corsOptions));
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
                url: `https://delivery-app-ocim.onrender.com/`,
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
                        adult: { type: 'boolean', example: true },
                    },
                    required: ['email', 'password', 'username', 'name', 'lastname', 'adult'],
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
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
// Conectar a MongoDB Atlas
mongoose_1.default.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
app.use(express_1.default.json());
app.use('/api', users_route_1.default);
app.use('/api', session_routes_1.default);
app.use('/api', drinks_routes_1.default);
app.use('/api', cart_routes_1.default);
app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
