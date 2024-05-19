import { Router } from 'express';
import { BookController } from '../controllers';

const bookRouter = Router();
const bookController = new BookController();

bookRouter.get('/', bookController.getAllBooks);
bookRouter.post('/', bookController.createBook);
bookRouter.get('/:id', bookController.getBookById);

export { bookRouter };
