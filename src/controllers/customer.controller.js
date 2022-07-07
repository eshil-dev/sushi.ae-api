import Customer from '../models/customer/customer.model';

export const registerCustomer = async (req, res) => {
    const { uid, name, phone } = req.body;
    try {
        const customer = Customer({ uid, name, phone });
        const result = await customer.save();
        return res.send(result);
    } catch (err) {
        return res.send(err);
    }
}