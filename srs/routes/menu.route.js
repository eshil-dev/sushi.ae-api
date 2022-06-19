import express from 'express';
import passport from 'passport';

import {
        listCategory,
        postCategory,
        updateCategory,
        deleteCategory,
        uploadPhoto,
        listMenu,
        postMenu,
        updateMenu,
        deleteMenu
} from '../controllers/menu.controller';

const menuRouter = express.Router();

// menuRouter.use(passport.authenticate('jwt', { session: false }));

menuRouter.route('/upload')
        .post(uploadPhoto);

menuRouter.route('/category')
        .post(postCategory)
        .get(listCategory);

menuRouter.route('/category/:id')
        .patch(updateCategory)
        .delete(deleteCategory)

menuRouter.route('/')
        .post(postMenu)
        .get(listMenu);

menuRouter.route('/:id')
        .patch(updateMenu)
        .delete(deleteMenu)

export default menuRouter;