import { DataSource, Repository } from 'typeorm';
import { User, Book, UserBook } from '../entities';
import { HttpError } from '../utils';

class UserService {
  private dataSource: DataSource;
  private userRepository: Repository<User>;
  private bookRepository: Repository<Book>;
  private userBookRepository: Repository<UserBook>;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
    this.userRepository = this.dataSource.getRepository(User);
    this.bookRepository = this.dataSource.getRepository(Book);
    this.userBookRepository = this.dataSource.getRepository(UserBook);
  }

  async createUser(userData: any) {
    const user = this.userRepository.create(userData);
    await this.userRepository.save(user);
    return user;
  }

  async getAllUsers() {
    return this.userRepository.find();
  }

  async getUserById(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['userBooks'],
    });
  }

  async borrowBook(userId: number, bookId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const book = await this.bookRepository.findOne({ where: { id: bookId } });

    if (!user || !book) {
      throw new HttpError('User or book not found', 404);
    }

    const userBook = this.userBookRepository.create({
      user,
      book,
      status: 'present',
      userScore: null,
    });

    return this.userBookRepository.save(userBook);
  }

  async returnBook(userId: number, bookId: number) {
    const userBook = await this.userBookRepository.findOne({
      where: { user: { id: userId }, book: { id: bookId }, status: 'present' },
    });

    if (!userBook) {
      throw new HttpError('Borrowed book not found for this user', 404);
    }

    userBook.status = 'past';
    return this.userBookRepository.save(userBook);
  }
}

export { UserService };
