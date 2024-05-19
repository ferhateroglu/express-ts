import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services';
import { dataSource } from '../config/database';
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
      res.status(201).json(user);
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
      next(error);
    }
  }

  async returnBook(req: Request, res: Response, next: NextFunction) {
    try {
      const userBook = await this.userService.returnBook(Number(req.params.userId), Number(req.params.bookId));
      res.json(userBook);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
