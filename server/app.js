import express, { json } from 'express';
import cors from 'cors';
import { createPizzaRouter } from './routes/pizza.js';
import { createUserRouter } from './routes/user.route.js';
import cookieParser from 'cookie-parser';

export const createApp = ({ pizzaModel, userModel }) => {
    
    const app = express();
    const PORT = process.env.PORT || 8080;

    app.disable('x-powered-by'); //Disable the x-powered-by header

    // Middleware per il parsing dei JSON and CORS
    app.use(json())
    app.use(cors())
    app.use(cookieParser());

    app.use('/pizza', createPizzaRouter({ pizzaModel }));
    app.use('/user', createUserRouter({ userModel }));

    app.listen(PORT, ()=> {
        console.log(`Server is running on port http://localhost:${PORT}`);
    })
}