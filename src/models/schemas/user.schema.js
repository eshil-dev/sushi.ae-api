import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { config } from '../../config/db.config.js';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
    },
    imageAvatarUrl: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, email: this.email }, config.passport.secret, {
        expiresIn: 1000000,
    });
    return token;
}

userSchema.methods.comparePassword = function comparePassword(password) {
    return bcrypt.compareSync(password, this.password);
}

export default userSchema;