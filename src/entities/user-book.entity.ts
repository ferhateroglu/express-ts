import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Book } from './book.entity';

@Entity()
export class UserBook extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userBooks)
  user: User;

  @ManyToOne(() => Book, (book) => book.userBooks)
  book: Book;

  // TODO: open this line after move sqlitedb to postgres
  // @Column({
  //   type: 'enum',
  //   enum: ['past', 'present'],
  // })
  @Column()
  status: string; // 'past' | 'present';

  @Column({
    type: 'int',
    nullable: true,
  })
  userScore: number | null;
}
