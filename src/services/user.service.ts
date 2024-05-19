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
    return this.userRepository.save(user);
  }

  async getAllUsers() {
    return this.userRepository.find();
  }

  async getUserById(id: number) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userBooks', 'userBook')
      .leftJoinAndSelect('userBook.book', 'book')
      .where('user.id = :id', { id })
      .select([
        'user.id as id',
        'user.name as name',
        'userBook.status as status',
        'book.name as bookName',
        'userBook.userScore as userScore',
      ])
      .getRawMany();

    if (!user || user.length === 0) {
      throw new HttpError('User not found', 404);
    }

    const pastBooks: { name: string; userScore: number }[] = [];
    const presentBooks: { name: string }[] = [];

    user.forEach((entry) => {
      console.log(entry);
      if (entry.status === 'past') {
        pastBooks.push({
          name: entry.bookname,
          userScore: entry.userscore,
        });
      } else if (entry.status === 'present') {
        presentBooks.push({
          name: entry.bookname,
        });
      }
    });

    return {
      id: user[0].id,
      name: user[0].name,
      books: {
        past: pastBooks,
        present: presentBooks,
      },
    };
  }

  async borrowBook(userId: number, bookId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const book = await this.bookRepository.findOne({ where: { id: bookId } });

    if (!user || !book) {
      throw new HttpError('User or book not found', 404);
    }

    const isAvailable = await this.isBookAvailable(bookId);
    if (!isAvailable) {
      throw new HttpError('Book is not available', 400);
    }

    const userBook = this.userBookRepository.create({
      user,
      book,
      status: 'present',
      userScore: null,
    });

    return this.userBookRepository.save(userBook);
  }

  async returnBook(userId: number, bookId: number, score?: number) {
    const userBook = await this.userBookRepository.findOne({
      where: { user: { id: userId }, book: { id: bookId }, status: 'present' },
    });

    if (!userBook) {
      throw new HttpError('Borrowed book not found for this user', 404);
    }

    userBook.status = 'past';
    userBook.userScore = score || null;
    return this.userBookRepository.save(userBook);
  }

  private async isBookAvailable(bookId: number) {
    const borrowedBook = await this.userBookRepository.findOne({
      where: { book: { id: bookId }, status: 'present' },
    });

    return !borrowedBook;
  }
}

export { UserService };
