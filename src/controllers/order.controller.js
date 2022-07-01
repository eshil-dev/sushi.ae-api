import Order from "../models/order/order.model";

export const postOrder = async (req, res) => {
    const { customerName, address, phone, location, orders, payment, status } = req.body;
    try {
        const orderedCollection = Order({
            customerName: customerName,
            address: address,
            phone: phone,
            location: {
                type: location.type,
                coordinates: location.coordinates
            },
            ordered_menu: orders,
            payment: {
                type: payment.type,
                paid: payment.paid,
                currency: payment.currency,
                pay_ref: payment.pay_ref
            },
            status: status
        });
        const result = await orderedCollection.save();
        return res.send(result);
    } catch (err) {
        return res.send(err);
    }
}

export const listOrder = async (req, res) => {
    const orders = await Order.find().populate({path: 'ordered_menu', populate: 'menu'})
    return res.send(orders);
}