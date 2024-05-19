import { Router } from 'express';
import userController from '../controllers/user.controller';

const userRouter = Router();

userRouter.get('/', userController.getAllUsers);
userRouter.post('/', userController.create);
userRouter.get('/:id', userController.getUserById);
userRouter.post('/:userId/borrow/:bookId', userController.borrowBook);
userRouter.post('/:userId/return/:bookId', userController.returnBook);

export { userRouter };
