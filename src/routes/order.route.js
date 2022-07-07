import express from "express";

import { listOrder, postOrder, updateOrderStatus, listOrderByUid } from "../controllers/order.controller";

const orderRouter = express.Router();

orderRouter.route('/').get(listOrder);
orderRouter.route('/').post(postOrder);
orderRouter.route('/:id').patch(updateOrderStatus);
orderRouter.route('/:uid').get(listOrderByUid)

export default orderRouter;