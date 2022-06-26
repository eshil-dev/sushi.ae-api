import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

import { config } from '../config/db.config';
import User from '../models/users/user.model';
import {
  generateHashedPassword,
  generateServerErrorCode
} from '../utils/utils';

import {
  SOME_THING_WENT_WRONG,
  USER_EXISTS_ALREADY,
  WRONG_PASSWORD,
  USER_DOES_NOT_EXIST,
} from '../utils/constant';
import { uploadToS3 } from '../utils/imageService';

async function createUser(fullName, email, imageAvatarUrl, password) {
  const data = {
    fullName,
    email,
    imageAvatarUrl,
    password: await generateHashedPassword(password),
  };
  return User(data).save();
}

/**
 * GET/
 * retrieve and display all Users in the User Model
 */
// userController.get(
//   '/',
export const listUsers = async (req, res) => {
  const result = await User.find()
  return res.status(200).send(result);
}

/**
 * POST/
 * Register a user
 */
export const registerUser = async (req, res) => {
  const errorsAfterValidation = validationResult(req);
  if (!errorsAfterValidation.isEmpty()) {
    res.status(400).json({
      code: 400,
      errors: errorsAfterValidation.mapped(),
    });
  } else {
    try {
      const { fullName, email, imageName, imageBase64, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        let imageAvatarUrl = ''
        if(imageName && imageBase64) {
          imageAvatarUrl = await uploadToS3(imageName, imageBase64);
        }
        await createUser(fullName, email, imageAvatarUrl, password);
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

/**
 * POST/
 * Login a user
 */
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
