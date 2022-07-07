import express from "express";

import { registerCustomer } from "../controllers/customer.controller";

const customerRouter = express.Router();

customerRouter.route('/register').post(registerCustomer);

export default customerRouter;