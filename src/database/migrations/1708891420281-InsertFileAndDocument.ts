import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertFileAndDocument1708891420281 implements MigrationInterface {
  name = 'InsertFileAndDocument1708891420281';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "easyinventory"."app_file" ("id" SERIAL NOT NULL, "creation_date" TIMESTAMP NOT NULL DEFAULT now(), "update_date" TIMESTAMP NOT NULL DEFAULT now(), "delete_date" TIMESTAMP, "originalname" character varying NOT NULL, "path" character varying NOT NULL, "content_type" character varying NOT NULL, "size" integer NOT NULL, CONSTRAINT "PK_e432bb99db5406c0b94289e3809" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "easyinventory"."document" ("id" SERIAL NOT NULL, "creation_date" TIMESTAMP NOT NULL DEFAULT now(), "update_date" TIMESTAMP NOT NULL DEFAULT now(), "delete_date" TIMESTAMP, "label" character varying NOT NULL, "app_file_id" integer NOT NULL, "inventory_id" integer NOT NULL, CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "easyinventory"."document" ADD CONSTRAINT "FK_851febab5463e46211eb7ef62f1" FOREIGN KEY ("app_file_id") REFERENCES "easyinventory"."app_file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "easyinventory"."document" ADD CONSTRAINT "FK_6a9ec1a4bfd82f02b429b6698ae" FOREIGN KEY ("inventory_id") REFERENCES "easyinventory"."inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "easyinventory"."document" DROP CONSTRAINT "FK_6a9ec1a4bfd82f02b429b6698ae"`,
    );
    await queryRunner.query(
      `ALTER TABLE "easyinventory"."document" DROP CONSTRAINT "FK_851febab5463e46211eb7ef62f1"`,
    );
    await queryRunner.query(`DROP TABLE "easyinventory"."document"`);
    await queryRunner.query(`DROP TABLE "easyinventory"."app_file"`);
  }
}
