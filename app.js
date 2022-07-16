import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import passport from 'passport';
import 'dotenv/config';

import { config } from './src/config/db.config.js';
import { applyPassportStrategy } from './src/utils/passport.js';

// Importing all the routes here
import userRouter from './src/routes/user.route.js';
import menuRouter from './src/routes/menu.route.js';
import categoryRouter from './src/routes/category.route.js';
import orderRouter from './src/routes/order.route.js';
import customerRouter from './src/routes/customer.route.js';

const app = express();

// All middlewares
applyPassportStrategy(passport);
app.use(cors());
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ extended: true, limit: '200mb' }));

// Routes
app.use('/api/user', userRouter);
app.use('/api/menu', menuRouter);
app.use('/api/category', categoryRouter);
app.use('/api/order', orderRouter);
app.use('/api/customer', customerRouter);

const { port, mongoDBUri } = config.env;

// Sinle fuction for connectin to database and starting server.
const start = async () => {
    try {
        await mongoose.connect(mongoDBUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to database successfully.')
    } catch (err) {
        console.log('Error accured while connecting to Database')
    }
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
}

start()