import mongoose from "mongoose";

import customerSchema from "../schemas/customer.schema";

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;