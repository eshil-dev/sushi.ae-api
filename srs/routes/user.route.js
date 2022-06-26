import express from 'express';
import passport from 'passport';

import { listUsers, registerUser, loginUser } from '../controllers/user.controller';

import { registerValidation, loginValidation } from '../utils/utils';

const userRouter = express.Router();

userRouter.route('/register').post(registerValidation, registerUser);
userRouter.route('/login').post(loginValidation, loginUser);
userRouter.use(passport.authenticate('jwt', { session: false }))
userRouter.route('/').get(passport.authenticate('jwt', { session: false }), listUsers);

export default userRouter;