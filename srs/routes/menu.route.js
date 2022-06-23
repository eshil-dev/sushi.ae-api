import express from 'express';
import passport from 'passport';

import {
        listMenu,
        postMenu,
        updateMenu,
        deleteMenu
} from '../controllers/menu.controller';

const menuRouter = express.Router();

// menuRouter.use(passport.authenticate('jwt', { session: false }));

menuRouter.route('/')
        .post(postMenu)
        .get(listMenu);

menuRouter.route('/:id')
        .patch(updateMenu)
        .delete(deleteMenu)

export default menuRouter;