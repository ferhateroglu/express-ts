import { Router } from 'express';
import { UserController } from '../controllers';
import { validateBody, validateParams } from '../middlewares';
import { byIdSchema, barrowReturnSchema, createSchema, returnBodySchema } from '../utils';

const userController = new UserController();
const userRouter = Router();

userRouter.get('/', userController.getAllUsers);
userRouter.post('/', validateBody(createSchema), userController.create);
userRouter.get('/:id', validateParams(byIdSchema), userController.getUserById);
userRouter.post('/:userId/borrow/:bookId', validateParams(barrowReturnSchema), userController.borrowBook);
userRouter.post(
  '/:userId/return/:bookId',
  validateParams(barrowReturnSchema),
  validateBody(returnBodySchema),
  userController.returnBook,
);

export { userRouter };
