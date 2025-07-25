import express from 'express';
import { getUsers, getUser, deleteUser } from '../controllers/user.controller.js';
import { verifyAccessToken } from '../middleware/auth.middleware.js';

const userRouter = express.Router();

userRouter.get('/users', verifyAccessToken, getUsers);
userRouter.get('/:id', verifyAccessToken, getUser);
// userRouter.post('/', createUser);
// userRouter.put('/:id', updateUser);
userRouter.delete('/:id', verifyAccessToken, deleteUser);

export default userRouter;
