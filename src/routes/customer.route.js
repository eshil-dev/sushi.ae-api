import express from "express";

import { registerCustomer, customersList } from "../controllers/customer.controller";

const customerRouter = express.Router();

customerRouter.route('/register').post(registerCustomer);
customerRouter.route('/').get(customersList);

export default customerRouter;