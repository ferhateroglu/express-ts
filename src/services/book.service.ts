import { DataSource, Repository } from 'typeorm';
import { Book } from '../entities';
import { HttpError } from '../utils';

class BookService {
  private dataSource: DataSource;
  private bookRepository: Repository<Book>;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
    this.bookRepository = this.dataSource.getRepository(Book);
  }

  async createBook(bookName: string) {
    const book = this.bookRepository.create({ name: bookName });
    await this.bookRepository.save(book);
    return book;
  }

  async getAllBooks() {
    return this.bookRepository.find();
  }

  async getBookById(id: number) {
    const book = await this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.userBooks', 'userbook')
      .where('book.id = :id', { id })
      .select(['book.id as id', 'book.name as name', 'COALESCE( AVG(userbook.userScore), -1) AS score'])
      .groupBy('book.id')
      .limit(1)
      .getRawOne();
    if (!book) {
      throw new HttpError('Book not found', 404);
    }
    return book;
  }
}

export { BookService };
