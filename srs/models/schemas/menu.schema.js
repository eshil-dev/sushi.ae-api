import mongoose from 'mongoose';

const menuSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        enum: ['Dollar', 'Derham'],
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    }
});

export default menuSchema;



