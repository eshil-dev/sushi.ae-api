import express from "express";

const categoryRouter = express.Router();

import {
    listCategory,
    postCategory,
    updateCategory,
    deleteCategory
} from "../controllers/category.controller";

categoryRouter.route('/')
    .post(postCategory)
    .get(listCategory);

categoryRouter.route('/:id')
    .patch(updateCategory)
    .delete(deleteCategory);

export default categoryRouter;

