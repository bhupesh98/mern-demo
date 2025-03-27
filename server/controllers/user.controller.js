import UserModel from '../models/user.model.js';
import {
  response_200,
  response_201,
  response_400,
  response_401,
  response_404,
  response_500,
} from '../utils/response-codes.js';

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select('-password');
    response_200(res, users);
  } catch (err) {
    response_500(res, 'Server Error', err);
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId).select(
      '-password',
    );
    if (!user) return response_404(res, 'User not found');
    response_200(res, user);
  } catch (err) {
    response_500(res, 'Server Error', err);
  }
};

// Create new user
export const createUser = async (req, res) => {
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (user) return response_400(res, 'User already exists');

    const newUser = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    user = await newUser.save();
    response_201(res, {
      _id: user._id,
      name: user.name,
      email: user.email,
      created: user.created,
    });
  } catch (err) {
    response_500(res, 'Server Error', err);
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    if (!user) return response_404(res, 'User not found');

    // Make sure user can only update their own account unless they're an admin
    if (req.user.id !== req.params.userId) {
      return response_401(res, 'Not authorized');
    }

    // Update fields
    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;
    if (req.body.password) user.password = req.body.password;
    user.updated = Date.now();

    await user.save();
    response_200(res, {
      _id: user._id,
      name: user.name,
      email: user.email,
      updated: user.updated,
    });
  } catch (err) {
    response_500(res, 'Server Error', err);
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    if (!user) return response_404(res, 'User not found');

    // Make sure user can only delete their own account unless they're an admin
    if (req.user.id !== req.params.userId) {
      return response_401(res, 'Not authorized');
    }

    await user.deleteOne();
    response_200(res, { msg: 'User deleted' });
  } catch (err) {
    response_500(res, 'Server Error', err);
  }
};
