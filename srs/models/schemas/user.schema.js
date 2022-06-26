import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { config } from '../../config/db.config';

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
    imageAvatarUrl: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, name: this.name, email: this.email }, config.passport.secret, {
        expiresIn: 1000000,
    });
    return token;
}

userSchema.methods.comparePassword = function comparePassword(password) {
    return bcrypt.compareSync(password, this.password);
}

export default userSchema;