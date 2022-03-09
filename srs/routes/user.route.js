import express from 'express';
import passport from 'passport';

import { listUser, registerUser, loginUser } from '../controllers/user.controller';

import { registerValidation, loginValidation } from '../utils/utils';

const userRouter = express.Router();

// userRouter.use(passport.authenticate('jwt', { session: false }))
userRouter.route('/').get(passport.authenticate('jwt', { session: false }), listUser);
userRouter.route('/register').post(registerValidation, registerUser);
userRouter.route('/login').post(loginValidation, loginUser);

export default userRouter;