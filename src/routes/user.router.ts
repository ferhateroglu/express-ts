import { Router } from 'express';
import userController from '../controllers/user.controller';

const router = Router();

router.post('/users', userController.createUser);

export default router;
