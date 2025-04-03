import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';
import compression from 'compression';
import itemRouter from './routes/item.routes.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import path from 'path';
import cookieParser from 'cookie-parser';
config();

// Initialize app
const app = express();

// Middleware
app.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true, // Allow cookies to be sent with requests
  }),
);
app.use(express.json()); // Body parser
app.use(express.urlencoded({ extended: true })); // Allows query strings in URL
app.use(cookieParser()); // Parse cookies
app.use(express.static(path.join(import.meta.dirname, 'public'))); // Serve static files

// Enabling compression
app.use(compression());

// // Connect to MongoDB
connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Define routes
app.use('/api/items', itemRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

// Basic route
app.get('/', (req, res) => {
  console.log(req.body);
  res.status(200).json(req.body);
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
