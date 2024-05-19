import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1716161100723 implements MigrationInterface {
  name = 'Migrations1716161100723';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "book" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_book" ("id" SERIAL NOT NULL, "status" "public"."user_book_status_enum" NOT NULL, "userScore" integer, "userId" integer, "bookId" integer, CONSTRAINT "PK_3fdacff8af7da81a1cab6bc9f17" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_book" ADD CONSTRAINT "FK_ab47037d446ad35a3437ad77170" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_book" ADD CONSTRAINT "FK_82b430d61bfdb4e840329b48170" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_book" DROP CONSTRAINT "FK_82b430d61bfdb4e840329b48170"`);
    await queryRunner.query(`ALTER TABLE "user_book" DROP CONSTRAINT "FK_ab47037d446ad35a3437ad77170"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "user_book"`);
    await queryRunner.query(`DROP TABLE "book"`);
  }
}
