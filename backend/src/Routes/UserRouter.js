import express from 'express';
import UserController from '../Controller/UserController.js';
import AuthMiddleware from '../Middleware/AuthMiddleware.js';

const userRouter = express.Router();

userRouter.get('/', UserController.getDatasUsers);
userRouter.get('/:user_id', UserController.getUserById);
userRouter.put('/:user_id', AuthMiddleware.updateMiddleware, UserController.updateUserr);
userRouter.delete('/:user_id', UserController.deleteUser);

export default userRouter;