import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
// import { UserBook } from '../userbook/userbook.entity';
import { BaseEntity } from '../entities/base.entity';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @OneToMany(() => UserBook, (userBook) => userBook.user)
  // userBooks: UserBook[];
}
