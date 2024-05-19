import { Request, Response, NextFunction } from 'express';
import UserService from '../services/UserService';
import { dataSource } from '../config/database';
import BaseController from './BaseController';

class UserController extends BaseController {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService(dataSource);
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
