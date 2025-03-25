import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';
import compression from 'compression';
import itemRouter from './controllers/item.controller.js';
import path from 'path';
config();

// Initialize app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Body parser
app.use(express.urlencoded({ extended: true })); // Allows query strings in URL
app.use(express.static(path.join(import.meta.dirname, 'public'))); // Serve static files

// Enabling compression
app.use(compression());

// Connect to MongoDB
connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Define routes
app.use('/api/items', itemRouter);

// Basic route
app.get('/', (_req, res) => {
  res.status(200).send('Hello!, This is API...');
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
