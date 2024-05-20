import { Router } from 'express';
import { BookController } from '../controllers';
import { validateBody, validateParams } from '../middlewares';
import { byIdSchema, createSchema } from '../utils';

const bookRouter = Router();
const bookController = new BookController();

bookRouter.get('/', bookController.getAllBooks);
bookRouter.post('/', validateBody(createSchema), bookController.createBook);
bookRouter.get('/:id', validateParams(byIdSchema), bookController.getBookById);

export { bookRouter };
