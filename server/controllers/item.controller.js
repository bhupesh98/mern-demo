import ItemModel from '../models/item.model.js';
import {
  response_200,
  response_201,
  response_401,
  response_404,
  response_500,
} from '../utils/response-codes.js';

// Get all items for the logged-in user
export const getAllItems = async (req, res) => {
  try {
    // Get query parameters
    const sortOrder = req.query.order === 'asc' ? 1 : -1;
    const limit = Number.parseInt(req.query.limit) || 10;

    // Execute query with user filter, sorting and limit
    const items = await ItemModel.find({ user: req.user.id })
      .sort({ date: sortOrder })
      .limit(limit);

    response_200(res, items);
  } catch (err) {
    response_500(res, 'Server Error', err);
  }
};

// Get a single item by ID
export const getItemById = async (req, res) => {
  try {
    const item = await ItemModel.findById(req.params.id);

    if (!item) return response_404(res, 'Item not found');

    // Verify ownership
    if (item.user.toString() !== req.user.id) {
      return response_401(res, 'Not authorized to access this item');
    }

    response_200(res, item);
  } catch (err) {
    response_500(res, 'Server Error', err);
  }
};

// Create a new item
export const createItem = async (req, res) => {
  try {
    const newItem = new ItemModel({
      name: req.body.name,
      description: req.body.description,
      user: req.user.id, // Associate item with logged-in user
    });

    const item = await newItem.save();
    response_201(res, item);
  } catch (err) {
    response_500(res, 'Server Error', err);
  }
};

// Delete an item by ID
export const deleteItem = async (req, res) => {
  try {
    const item = await ItemModel.findById(req.params.id);

    if (!item) return response_404(res, 'Item not found');

    // Check if user owns this item
    if (item.user.toString() !== req.user.id) {
      return response_401(res, 'Not authorized to delete this item');
    }

    await item.deleteOne();
    response_200(res, { message: 'Item deleted' });
  } catch (err) {
    response_500(res, 'Server Error', err);
  }
};
