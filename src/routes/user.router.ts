import { Router } from 'express';
import userController from '../controllers/user.controller';

const router = Router();

router.get('/', userController.getAllUsers);
router.post('/', userController.create);
router.get('/:id', userController.getUserById);
router.post('/:userId/borrow/:bookId', userController.borrowBook);
router.post('/:userId/return/:bookId', userController.returnBook);

export default router;
