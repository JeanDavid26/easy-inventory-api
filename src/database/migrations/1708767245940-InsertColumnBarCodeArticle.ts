import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertColumnBarCodeArticle1708767245940
  implements MigrationInterface
{
  name = 'InsertColumnBarCodeArticle1708767245940';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "easyinventory"."article" ADD "bar_code" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "easyinventory"."article" DROP COLUMN "bar_code"`,
    );
  }
}
