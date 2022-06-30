import mongoose from "mongoose";

import orderSchema from "../schemas/order.schema.js";

const Order = mongoose.model('Order', orderSchema);

export default Order;