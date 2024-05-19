import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
// import { UserBook } from '../userbook/userbook.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @OneToMany(() => UserBook, (userBook) => userBook.user)
  // userBooks: UserBook[];
}
