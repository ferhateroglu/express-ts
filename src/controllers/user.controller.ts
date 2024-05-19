import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services';
import dataSource from '../db/data-source';
import BaseController from './base.controller';

class UserController extends BaseController {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService(dataSource);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json({
        success: true,
        message: 'User created',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.getUserById(Number(req.params.id));
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async borrowBook(req: Request, res: Response, next: NextFunction) {
    try {
      const userBook = await this.userService.borrowBook(Number(req.params.userId), Number(req.params.bookId));
      res.json(userBook);
    } catch (error) {
      console.log('error in borrowBook');
      next(error);
    }
  }

  async returnBook(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, bookId } = req.params;
      const { score } = req.body;
      const userBook = await this.userService.returnBook(
        Number(userId),
        Number(bookId),
        score ? Number(score) : undefined,
      );
      res.json({
        success: true,
        message: 'Book returned',
        data: userBook,
      });
    } catch (error) {
      next(error);
    }
  }
}

export { UserController };
