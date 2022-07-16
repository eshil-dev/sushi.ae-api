import express from "express";

import { registerCustomer, customersList, customerLocationByUid } from "../controllers/customer.controller.js";

const customerRouter = express.Router();

customerRouter.route('/register').post(registerCustomer);
customerRouter.route('/').get(customersList);
customerRouter.route('/location/:uid').get(customerLocationByUid);

export default customerRouter;