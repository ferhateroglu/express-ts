import { Request, Response } from 'express';
import { User } from '../entities/User';
import { Repository, DataSource } from 'typeorm';

export class UserController {
  private userRepository: Repository<User>;

  constructor(dataSource: DataSource) {
    this.userRepository = dataSource.getRepository(User);
  }

  async index(req: Request, res: Response) {
    const users = await this.userRepository.find();
    res.send(users);
  }

  async create(req: Request, res: Response) {
    const user = new User();
    user.name = req.body.name;

    await this.userRepository.save(user);
    res.send(user);
  }
}
