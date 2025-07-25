import express from 'express';
import { signIn, signOut, signUp, refreshAccessToken } from '../controllers/auth.controller.js';
import { verifyAccessToken } from '../middleware/auth.middleware.js';

const authRouter = express.Router();

// Path: /api/v1/auth/
authRouter.post('/signup', signUp);
authRouter.post('/signin', signIn);
authRouter.post('/signout', verifyAccessToken, signOut);
authRouter.post('/refresh-token', refreshAccessToken);

export default authRouter;
