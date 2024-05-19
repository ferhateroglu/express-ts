import { Request, Response, NextFunction } from 'express';
import { BookService } from '../services';
import dataSource from '../db/data-source';
import BaseController from './base.controller';

class BookController extends BaseController {
  private bookService: BookService;

  constructor() {
    super();
    this.bookService = new BookService(dataSource);
  }

  async createBook(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const book = await this.bookService.createBook(name);
      res.status(201).json({
        success: true,
        message: 'Book created successfully',
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllBooks(req: Request, res: Response, next: NextFunction) {
    try {
      const books = await this.bookService.getAllBooks();
      res.status(200).json({
        success: true,
        message: 'Books retrieved successfully',
        data: books,
      });
    } catch (error) {
      next(error);
    }
  }

  async getBookById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const book = await this.bookService.getBookById(Number(id));
      res.status(200).json({
        success: true,
        message: 'Book retrieved successfully',
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }
}

export { BookController };
