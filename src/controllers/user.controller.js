import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

import { config } from '../config/db.config.js';
import User from '../models/users/user.model.js';
import {
  generateHashedPassword,
  generateServerErrorCode
} from '../utils/utils.js';

import {
  SOME_THING_WENT_WRONG,
  USER_EXISTS_ALREADY,
  WRONG_PASSWORD,
  USER_DOES_NOT_EXIST,
} from '../utils/constant.js';
import { uploadToS3 } from '../utils/imageService.js';

async function createUser(fullName, email, phone, imageAvatarUrl, password) {
  const data = {
    fullName,
    email,
    phone,
    imageAvatarUrl,
    password: await generateHashedPassword(password),
  };
  return User(data).save();
}

export const listUsers = async (req, res) => {
  const result = await User.find()
  return res.status(200).send(result);
}

export const registerUser = async (req, res) => {
  const errorsAfterValidation = validationResult(req);
  if (!errorsAfterValidation.isEmpty()) {
    res.status(400).json({
      code: 400,
      errors: errorsAfterValidation.mapped(),
    });
  } else {
    try {
      const { fullName, email, phone, imageName, imageBase64, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        let imageAvatarUrl = ''
        if (imageName && imageBase64) {
          imageAvatarUrl = await uploadToS3(imageName, imageBase64);
        }
        await createUser(fullName, email, phone, imageAvatarUrl, password);
        // Sign token
        const newUser = await User.findOne({ email });
        const token = jwt.sign({ email }, config.passport.secret, {
          expiresIn: 10000000,
        });
        const userToReturn = { ...newUser.toJSON(), ...{ token } };
        delete userToReturn.password;
        res.status(200).json(userToReturn);
      } else {
        generateServerErrorCode(
          res,
          403,
          'register email error',
          USER_EXISTS_ALREADY,
          'email'
        );
      }
    } catch (e) {
      generateServerErrorCode(res, 500, e, SOME_THING_WENT_WRONG);
    }
  }
}

export const updateUser = async (req, res) => {
  const id = req.params.id;

  const {
    fullName,
    email,
    phone,
    imageName,
    base64Image,
  } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.send({ message: 'User with the provided ID is not found' });
    } else {
      if (imageName && base64Image) {
        const s3ImageURL = await uploadToS3(imageName, base64Image);
        const result = await User.findByIdAndUpdate(id, {
          $set: {
            fullName: fullName,
            phone,
            email: email,
            imageAvatarUrl: s3ImageURL,
          }
        }, { new: true });
        return res.send(result);
      } else {
        const result = await User.findByIdAndUpdate(id, {
          $set: {
            fullName: fullName,
            email: email,
            phone
          }
        }, { new: true });
        return res.send(result);
      }
    }
  } catch (err) {
    return res.send(err);
  }
}

export const deleteUser = async (req, res) => {
  try {
    const userID = req.params.id;
    const user = await User.findById(userID);
    if (!user) {
      return res.send({ message: 'User with the provided ID is not found.' });
    }
    await User.findByIdAndDelete(userID);
    return res.send({ message: 'User is succesfully deleted.' });
  } catch (err) {
    return res.send(err)
  }
}

export const changePassword = async (req, res) => {
  const { emailAdd, currentPassword, confirmNewPassword } = req.body;
  try {
    const user = await User.findOne({ email: emailAdd });
    if (user && user.email) {
      const oldPasswordMatched = user.comparePassword(currentPassword);
      if (oldPasswordMatched) {
        const hashedPassword = await generateHashedPassword(confirmNewPassword)
        const result = await User.updateOne({ email: emailAdd }, {
          $set: { password: hashedPassword }
        });
        delete result.password
        return res.status(200).json(result)
      } else {
        generateServerErrorCode(
          res,
          403,
          'WRONG_CURRENT_PASSWORD',
          'password'
        );
      }
    }
    generateServerErrorCode(
      res,
      404,
      USER_DOES_NOT_EXIST,
      'email'
    );
  } catch (err) {
    generateServerErrorCode(res, 500, SOME_THING_WENT_WRONG);
  }
}

export const loginUser = async (req, res) => {
  const errorsAfterValidation = validationResult(req);
  if (!errorsAfterValidation.isEmpty()) {
    res.status(400).json({
      code: 400,
      errors: errorsAfterValidation.mapped(),
    });
  } else {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user && user.email) {
        const isPasswordMatched = user.comparePassword(password);
        if (isPasswordMatched) {
          // Sign token
          const token = user.generateAuthToken();
          const userToReturn = { ...user.toJSON(), ...{ token } };
          delete userToReturn.password;
          res.status(200).json(userToReturn);
        } else {
          generateServerErrorCode(
            res,
            403,
            WRONG_PASSWORD,
            'password'
          );
        }
      } else {
        generateServerErrorCode(
          res,
          404,
          USER_DOES_NOT_EXIST,
          'email'
        );
      }
    } catch (e) {
      generateServerErrorCode(res, 500, SOME_THING_WENT_WRONG);
    }
  }
}
