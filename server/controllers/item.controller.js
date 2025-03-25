import { Router } from 'express';
import ItemModel from '../models/item.model.js';
import {
  response_200,
  response_201,
  response_500,
} from '../utils/response-codes.js';
const itemRouter = Router();

itemRouter.get('/', async (req, res) => {
  try {
    // Get query parameters
    const sortOrder = req.query.order === 'asc' ? 1 : -1;

    // can have validation to only allow certain ranges
    const limit = Number.parseInt(req.query.limit) || 10;

    // Execute query with sorting and limit
    const items = await ItemModel.find().sort({ date: sortOrder }).limit(limit);

    response_200(res, items);
  } catch (err) {
    response_500(res, 'Server Error', err);
  }
});

itemRouter.post('/', async (req, res) => {
  try {
    const newItem = new ItemModel({
      name: req.body.name,
      description: req.body.description,
    });

    const item = await newItem.save();
    response_201(res, item);
  } catch (err) {
    response_500(res, 'Server Error', err);
  }
});

itemRouter.delete('/:id', async (req, res) => {
  try {
    const item = await ItemModel.findById(req.params.id);

    if (!item) return res.status(404).json({ msg: 'Item not found' });

    await item.deleteOne();
    response_200(res, 'Item deleted');
  } catch (err) {
    response_500(res, 'Server Error', err);
  }
});

export default itemRouter;
