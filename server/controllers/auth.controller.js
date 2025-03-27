import UserModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import {
  response_200,
  response_400,
  response_500,
} from '../utils/response-codes.js';

// User signin
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return response_400(res, "User's email doesn't exist");
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return response_400(res, 'Invalid credentials');
    }

    // Generate token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Set token in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure in production
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });

    response_200(res, {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    response_500(res, 'Server Error', err);
  }
};

// User signout
export const signOut = (_req, res) => {
  // Clear the token cookie
  res.clearCookie('token');
  response_200(res, { msg: 'Signed out successfully' });
};
