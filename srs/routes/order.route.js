import express from "express";

import { listOrder, postOrder } from "../controllers/order.controller";

const orderRouter = express.Router();

orderRouter.route('/').get(listOrder);
orderRouter.route('/').post(postOrder);

export default orderRouter;