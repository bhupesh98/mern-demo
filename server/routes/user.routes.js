import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const userRouter = Router();

// Get all users
userRouter.get('/', getUsers);

// Get user by ID
userRouter.get('/:userId', authenticate, getUserById);

// Create new user
userRouter.post('/', createUser);

// Update user
userRouter.put('/:userId', authenticate, updateUser);

// Delete user
userRouter.delete('/:userId', authenticate, deleteUser);

export default userRouter;
