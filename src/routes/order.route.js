import express from "express";

import { listOrder, postOrder, updateOrderStatus } from "../controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.route('/').get(listOrder);
orderRouter.route('/').post(postOrder);
orderRouter.route('/:id').patch(updateOrderStatus);

export default orderRouter;