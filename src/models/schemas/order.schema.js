import mongoose from 'mongoose';

const ORDER_STATUS = [
    'Ordered',
    'Accepted',
    'Rejected',
    'On the way',
    'Completed'
]

const orderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    location: {
        type: { type: String },
        coordinates: [Number],
    },
    ordered_menu:
        [{
            menu: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Menu',
            },
            qty: Number
        }],
    payment: {
        type: {
            type: String,
            required: true
        },
        paid: {
            type: mongoose.Schema.Types.Decimal128,
            required: true
        },
        currency: {
            type: String,
            required: true,
        },
        pay_ref: {
            type: Number,
            required: true
        }
    },
    status: {
        type: String,
        enum: ORDER_STATUS,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

export default orderSchema;