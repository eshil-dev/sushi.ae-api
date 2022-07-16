import Customer from '../models/customer/customer.model.js';
import Location from '../models/location/location.model.js';

export const registerCustomer = async (req, res) => {
    const { uid, name, phone } = req.body;
    try {
        const customer = await Customer.findOne({ uid });
        if (!customer) {
            const newCustomer = Customer({ uid, name, phone });
            const result = await newCustomer.save();
            return res.status(200).send(result);
        }
        return res.status(200).send(customer);
    } catch (err) {
        return res.send(err);
    }
}

export const customersList = async (req, res) => {
    const result = await Customer.aggregate([{
        $lookup: {
            from: 'locations',
            localField: '_id',
            foreignField: 'customer',
            as: 'locations'
        }
    }])
    return res.status(200).send(result);
}

export const customerLocationByUid = async (req, res) => {
    const uid = req.params.uid;
    const { _id } = await Customer.findOne({ uid: uid });
    const customerLocations = await Location.find({ customer: _id })
        .select('-customer -__v')
    return res.send(customerLocations)
}