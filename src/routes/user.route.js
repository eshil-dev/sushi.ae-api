import express from 'express';
import passport from 'passport';

import { listUsers, registerUser, updateUser, deleteUser, changePassword, loginUser } from '../controllers/user.controller';

import { registerValidation, loginValidation } from '../utils/utils';

const userRouter = express.Router();

userRouter.route('/login').post(loginValidation, loginUser);

userRouter.use(passport.authenticate('jwt', { session: false }))

userRouter.route('/register').post(registerValidation, registerUser);
userRouter.route('/:id').patch(updateUser).delete(deleteUser);
userRouter.route('/changePassword').post(changePassword);
userRouter.route('/').get(listUsers);

export default userRouter;