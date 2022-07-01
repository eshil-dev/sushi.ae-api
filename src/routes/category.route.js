import express from "express";
import passport from 'passport';

const categoryRouter = express.Router();

import {
    listCategory,
    postCategory,
    updateCategory,
    deleteCategory
} from "../controllers/category.controller";

categoryRouter.use(passport.authenticate('jwt', { session: false }));

categoryRouter.route('/')
    .post(postCategory)
    .get(listCategory);

categoryRouter.route('/:id')
    .patch(updateCategory)
    .delete(deleteCategory);

export default categoryRouter;

