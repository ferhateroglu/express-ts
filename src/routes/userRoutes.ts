import express from 'express';
import { UserController } from '../controllers/UserController';
import { DataSource } from 'typeorm';

// import type request and response
import { Request, Response } from 'express';

export class UserRouter {
  private userController: UserController;

  constructor(dataSource: DataSource) {
    this.userController = new UserController(dataSource);
  }

  attach() {
    const router = express.Router();
    router.get('/ping', this.ping.bind(this));
    return router;
  }

  private ping(req: Request, res: Response) {
    return res.send('pong');
  }
}
