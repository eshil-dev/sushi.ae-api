import express from "express";

import { registerCustomer, customersList, cusomerLocationByUid } from "../controllers/customer.controller";

const customerRouter = express.Router();

customerRouter.route('/register').post(registerCustomer);
customerRouter.route('/').get(customersList);
customerRouter.route('/location/:uid').get(cusomerLocationByUid);

export default customerRouter;