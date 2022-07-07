import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    address: {
        type: String,
    },
    location: {
        type: { type: String },
        coordinates: { lat: String, lng: String },
    },
});

export default locationSchema;