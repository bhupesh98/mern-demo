import { Router } from 'express';
import {
  getAllItems,
  getItemById,
  createItem,
  deleteItem,
} from '../controllers/item.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const itemRouter = Router();

// All item routes require authentication
itemRouter.use(authenticate);

// Get all items with optional sorting and limit (filtered by user)
itemRouter.get('/', getAllItems);

// Get a single item by ID
itemRouter.get('/:id', getItemById);

// Create a new item
itemRouter.post('/', createItem);

// Delete an item by ID
itemRouter.delete('/:id', deleteItem);

export default itemRouter;
