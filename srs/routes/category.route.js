import express from "express";

const categoryRouter = express.Router();

import {
    listCategory,
    postCategory,
    updateCategory,
    deleteCategory
} from "../controllers/category.controller";

categoryRouter.route('/category')
    .post(postCategory)
    .get(listCategory);

categoryRouter.route('/category/:id')
    .patch(updateCategory)
    .delete(deleteCategory);

export default categoryRouter;

