import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import passport from 'passport';

import { config } from './srs/config/db.config';

import { applyPassportStrategy } from './srs/utils/passport.js';

// Importing all the routes here
import userRouter from './srs/routes/user.route';
import menuRouter from './srs/routes/menu.route';

const app = express();

applyPassportStrategy(passport);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRouter);
app.use('/api/menu', menuRouter)

const { port, mongoDBUri, mongoHostName } = config.env;

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