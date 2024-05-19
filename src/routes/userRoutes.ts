import { Router } from 'express';
import userController from '../controllers/UserController';

const router = Router();

router.post('/users', userController.createUser);

export default router;
