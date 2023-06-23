import { Router } from 'express';
import UserController from '../controllers/user.js';

const userRouter = Router();

userRouter.post('/', UserController.createUser);
userRouter.put('/:id', UserController.editUser);
userRouter.get('/:id', UserController.getUser);
userRouter.delete('/:id', UserController.deleteUser);

export default userRouter;
