import express from 'express';

import menuControllerRouter from '../controllers/menu.controller';

const menuRouter = express.Router();

menuRouter.use('/', menuControllerRouter);

export default menuRouter;