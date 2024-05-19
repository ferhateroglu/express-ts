import { DataSource } from 'typeorm';

class UserService {
  private dataSource: DataSource;
  private userRepository: any;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
    this.userRepository = this.dataSource.getRepository('User');
  }

  async createUser(userData: any) {
    const user = this.userRepository.create(userData);
    await this.userRepository.save(user);
    return user;
  }
}

export default UserService;
