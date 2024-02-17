import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTable1707514694912 implements MigrationInterface {
  name = 'CreateTable1707514694912';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "easyinventory"."category" ("id" SERIAL NOT NULL, "creation_date" TIMESTAMP NOT NULL DEFAULT now(), "update_date" TIMESTAMP NOT NULL DEFAULT now(), "delete_date" TIMESTAMP, "label" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "easyinventory"."article" ("id" SERIAL NOT NULL, "creation_date" TIMESTAMP NOT NULL DEFAULT now(), "update_date" TIMESTAMP NOT NULL DEFAULT now(), "delete_date" TIMESTAMP, "label" character varying NOT NULL, "reference_code" character varying NOT NULL, "unit_price" double precision NOT NULL, "category_id" integer NOT NULL, CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "easyinventory"."article_quantity" ("article_id" integer NOT NULL, "inventory_id" integer NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_9378da88c521f16f5bde3c00e15" PRIMARY KEY ("article_id", "inventory_id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "easyinventory"."inventory_type_enum" AS ENUM('Achat ferme', 'Dépôt')`,
    );
    await queryRunner.query(
      `CREATE TABLE "easyinventory"."inventory" ("id" SERIAL NOT NULL, "creation_date" TIMESTAMP NOT NULL DEFAULT now(), "update_date" TIMESTAMP NOT NULL DEFAULT now(), "delete_date" TIMESTAMP, "label" character varying NOT NULL, "type" "easyinventory"."inventory_type_enum" NOT NULL, CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "easyinventory"."article_quantity_transaction" ("article_id" integer NOT NULL, "transaction_id" integer NOT NULL, "quantity" integer NOT NULL, "unitPrice" integer NOT NULL, CONSTRAINT "PK_d6b30a38b62768d44abe40acebb" PRIMARY KEY ("article_id", "transaction_id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "easyinventory"."transaction_type_enum" AS ENUM('Vente', 'Import')`,
    );
    await queryRunner.query(
      `CREATE TABLE "easyinventory"."transaction" ("id" SERIAL NOT NULL, "creation_date" TIMESTAMP NOT NULL DEFAULT now(), "update_date" TIMESTAMP NOT NULL DEFAULT now(), "delete_date" TIMESTAMP, "date" date NOT NULL, "inventory_id" integer NOT NULL, "type" "easyinventory"."transaction_type_enum" NOT NULL, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "easyinventory"."article" ADD CONSTRAINT "FK_cdd234ef147c8552a8abd42bd29" FOREIGN KEY ("category_id") REFERENCES "easyinventory"."category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "easyinventory"."article_quantity" ADD CONSTRAINT "FK_2808a08678fc572cbe675c42976" FOREIGN KEY ("article_id") REFERENCES "easyinventory"."article"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "easyinventory"."article_quantity" ADD CONSTRAINT "FK_931a9a03d64b9015024efc58326" FOREIGN KEY ("inventory_id") REFERENCES "easyinventory"."inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "easyinventory"."article_quantity_transaction" ADD CONSTRAINT "FK_ca591b54eff89a7a4b100d3541c" FOREIGN KEY ("article_id") REFERENCES "easyinventory"."article"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "easyinventory"."article_quantity_transaction" ADD CONSTRAINT "FK_b8d76744b9e094137b12d806f99" FOREIGN KEY ("transaction_id") REFERENCES "easyinventory"."transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "easyinventory"."transaction" ADD CONSTRAINT "FK_4d45b0875b191d884ffee47d74e" FOREIGN KEY ("inventory_id") REFERENCES "easyinventory"."inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "easyinventory"."transaction" DROP CONSTRAINT "FK_4d45b0875b191d884ffee47d74e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "easyinventory"."article_quantity_transaction" DROP CONSTRAINT "FK_b8d76744b9e094137b12d806f99"`,
    );
    await queryRunner.query(
      `ALTER TABLE "easyinventory"."article_quantity_transaction" DROP CONSTRAINT "FK_ca591b54eff89a7a4b100d3541c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "easyinventory"."article_quantity" DROP CONSTRAINT "FK_931a9a03d64b9015024efc58326"`,
    );
    await queryRunner.query(
      `ALTER TABLE "easyinventory"."article_quantity" DROP CONSTRAINT "FK_2808a08678fc572cbe675c42976"`,
    );
    await queryRunner.query(
      `ALTER TABLE "easyinventory"."article" DROP CONSTRAINT "FK_cdd234ef147c8552a8abd42bd29"`,
    );
    await queryRunner.query(`DROP TABLE "easyinventory"."transaction"`);
    await queryRunner.query(
      `DROP TYPE "easyinventory"."transaction_type_enum"`,
    );
    await queryRunner.query(
      `DROP TABLE "easyinventory"."article_quantity_transaction"`,
    );
    await queryRunner.query(`DROP TABLE "easyinventory"."inventory"`);
    await queryRunner.query(`DROP TYPE "easyinventory"."inventory_type_enum"`);
    await queryRunner.query(`DROP TABLE "easyinventory"."article_quantity"`);
    await queryRunner.query(`DROP TABLE "easyinventory"."article"`);
    await queryRunner.query(`DROP TABLE "easyinventory"."category"`);
  }
}
