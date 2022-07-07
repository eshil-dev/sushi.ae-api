import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

export default customerSchema;

