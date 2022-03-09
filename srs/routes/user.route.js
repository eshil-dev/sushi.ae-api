import express from 'express';
import passport from 'passport';

import userController from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.use('/', userController);

export default userRouter;