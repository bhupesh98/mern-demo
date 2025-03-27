import jwt from 'jsonwebtoken';
import { response_401 } from '../utils/response-codes.js';

export const authenticate = (req, res, next) => {
  // Get token from cookies instead of headers
  const token = req.cookies.token;

  // Check if no token in cookies
  if (!token) {
    return response_401(res, 'Not authenticated, authorization denied');
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user from payload
    req.user = decoded;
    next();
  } catch (err) {
    console.debug(err);
    response_401(res, 'Authentication invalid');
  }
};
