import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import passport from 'passport';

import { config } from './srs/config/db.config';
import { applyPassportStrategy } from './srs/utils/passport.js';

// Importing all the routes here
import userRouter from './srs/routes/user.route';
import menuRouter from './srs/routes/menu.route';
import categoryRouter from './srs/routes/category.route';

const app = express();

// All middlewares
applyPassportStrategy(passport);
app.use(cors());
app.use(express.json({limit: '200mb'}));
app.use(express.urlencoded({ extended: true, limit: '200mb' }));

// Routes
app.use('/api/user', userRouter);
app.use('/api/menu', menuRouter)
app.use('/api/category', categoryRouter)

const { port, mongoDBUri, mongoHostName } = config.env;

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