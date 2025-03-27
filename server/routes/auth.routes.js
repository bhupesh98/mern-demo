import { Router } from 'express';
import { signIn, signOut } from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const authRouter = Router();

// User signin
authRouter.post('/signin', signIn);

// User signout
authRouter.get('/signout', authenticate, signOut);

export default authRouter;
