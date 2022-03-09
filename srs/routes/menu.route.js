import express from 'express';
import passport from 'passport';

import { listCategory, postCategory, listMenu, postMenu } from '../controllers/menu.controller';

const menuRouter = express.Router();

menuRouter.use(passport.authenticate('jwt', { session: false }));

menuRouter.route('/')
        .post(postMenu)
        .get(listMenu);

menuRouter.route('/category')
        .post(postCategory)
        .get(listCategory);

export default menuRouter;