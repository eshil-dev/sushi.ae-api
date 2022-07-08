import Order from "../models/order/order.model.js";
import Location from '../models/location/location.model.js';
import Customer from "../models/customer/customer.model.js";

export const postOrder = async (req, res) => {
    const {
        customerId,
        prevLocationId,
        newAddress,
        newLocation,
        orders,
        payment,
        status
    } = req.body;

    try {

        let locationID = prevLocationId
        if (!locationID) {
            const location = Location({
                customer: customerId,
                address: newAddress,
                location: newLocation
            });
            const locatoinResult = await location.save();
            locationID = locatoinResult._id.toString()
        }
        const order = Order({
            customer: customerId,
            location: locationID,
            ordered_menu: orders,
            payment: {
                type: payment.type,
                paid: payment.paid,
                currency: payment.currency,
                pay_ref: payment.pay_ref
            },
            status: status
        });
        const result = await order.save();
        return res.send(result);

    } catch (err) {
        return res.send(err);
    }
}

export const updateOrderStatus = async (req, res) => {
    const id = req.params.id;
    const { newStatus } = req.body;

    try {
        const order = await Order.findById(id);
        if (!order)
            return res.send({ message: 'Order not found.' });
        const result = await Order.findByIdAndUpdate(id, { $set: { status: newStatus } }, { new: true });
        return res.send(result);
    } catch (err) {
        return res.send(err);
    }

}

export const listOrder = async (req, res) => {
    const orders = await Order.find({
        status: {
            $in: ['Ordered',
                'Accepted',
                'On the way',
                'Completed'
            ]
        }
    })
        .select('-__v')
        .populate({ path: 'ordered_menu', populate: 'menu' })
        .populate('customer', '-__v')
        .populate('location', '-__v');
    return res.send(orders);
}

export const listOrderByUid = async (req, res) => {
    const uid = req.params.uid;
    const { _id } = await Customer.findOne({ uid: uid });
    const userOrderHistory = await Order.find({ customer: _id })
        .populate({ path: 'ordered_menu', populate: 'menu' })
        .select('-location -customer -__v')
    return res.send(userOrderHistory)
}