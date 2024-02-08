import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTable1707403891205 implements MigrationInterface {
  name = 'CreateTable1707403891205';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "easyinventory"."category" ("id" SERIAL NOT NULL, "creation_date" TIMESTAMP NOT NULL DEFAULT now(), "update_date" TIMESTAMP NOT NULL DEFAULT now(), "delete_date" TIMESTAMP, "label" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "esayinventory"."article" ("id" SERIAL NOT NULL, "creation_date" TIMESTAMP NOT NULL DEFAULT now(), "update_date" TIMESTAMP NOT NULL DEFAULT now(), "delete_date" TIMESTAMP, "label" character varying NOT NULL, "reference_code" character varying NOT NULL, "unit_price" double precision NOT NULL, "category_id" integer NOT NULL, CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "easyinventory"."transaction_type_enum" AS ENUM('Vente', 'Import')`,
    );
    await queryRunner.query(
      `CREATE TABLE "easyinventory"."transaction" ("id" SERIAL NOT NULL, "creation_date" TIMESTAMP NOT NULL DEFAULT now(), "update_date" TIMESTAMP NOT NULL DEFAULT now(), "delete_date" TIMESTAMP, "date" date NOT NULL, "inventory_id" integer NOT NULL, "type" "easyinventory"."transaction_type_enum" NOT NULL, "value" double precision NOT NULL, "j_article_quantity" jsonb, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "easyinventory"."inventory_type_enum" AS ENUM('Achat ferme', 'Dépôt')`,
    );
    await queryRunner.query(
      `CREATE TABLE "easyinventory"."inventory" ("id" SERIAL NOT NULL, "creation_date" TIMESTAMP NOT NULL DEFAULT now(), "update_date" TIMESTAMP NOT NULL DEFAULT now(), "delete_date" TIMESTAMP, "designation" character varying NOT NULL, "type" "easyinventory"."inventory_type_enum" NOT NULL, CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" DROP CONSTRAINT "PK_40808690eb7b915046558c0f81b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" DROP COLUMN "id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" DROP COLUMN "creation_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" DROP COLUMN "update_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" DROP COLUMN "delete_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" DROP COLUMN "label"`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" DROP COLUMN "reference_code"`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" DROP COLUMN "unit_price"`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" DROP COLUMN "category_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" ADD "id" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" ADD CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" ADD "creation_date" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" ADD "update_date" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" ADD "delete_date" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" ADD "label" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" ADD "reference_code" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" ADD "unit_price" double precision NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" ADD "category_id" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" ADD "article_id" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" DROP CONSTRAINT "PK_40808690eb7b915046558c0f81b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" ADD CONSTRAINT "PK_0e3a53f75553d74b22bf7fd6ffe" PRIMARY KEY ("id", "article_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" ADD "inventory_id" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" DROP CONSTRAINT "PK_0e3a53f75553d74b22bf7fd6ffe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" ADD CONSTRAINT "PK_63db53bba7c748b69677642c37a" PRIMARY KEY ("id", "article_id", "inventory_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" ADD "quantity" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" DROP CONSTRAINT "PK_63db53bba7c748b69677642c37a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" ADD CONSTRAINT "PK_8ff715015a8c3602423f9f37ef1" PRIMARY KEY ("article_id", "inventory_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" ADD CONSTRAINT "FK_cdd234ef147c8552a8abd42bd29" FOREIGN KEY ("category_id") REFERENCES "easyinventory"."category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" ADD CONSTRAINT "FK_962ab3ae47140b8d85c11cb84ab" FOREIGN KEY ("article_id") REFERENCES "esayinventory"."article"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" ADD CONSTRAINT "FK_8fc5e79b3cd78e6b06cb78803b6" FOREIGN KEY ("inventory_id") REFERENCES "easyinventory"."inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "esayinventory"."article" DROP CONSTRAINT "FK_8fc5e79b3cd78e6b06cb78803b6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" DROP CONSTRAINT "FK_962ab3ae47140b8d85c11cb84ab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" DROP CONSTRAINT "FK_cdd234ef147c8552a8abd42bd29"`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" DROP CONSTRAINT "PK_8ff715015a8c3602423f9f37ef1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" ADD CONSTRAINT "PK_63db53bba7c748b69677642c37a" PRIMARY KEY ("id", "article_id", "inventory_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" DROP COLUMN "quantity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" DROP CONSTRAINT "PK_63db53bba7c748b69677642c37a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" ADD CONSTRAINT "PK_0e3a53f75553d74b22bf7fd6ffe" PRIMARY KEY ("id", "article_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" DROP COLUMN "inventory_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" DROP CONSTRAINT "PK_0e3a53f75553d74b22bf7fd6ffe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" ADD CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" DROP COLUMN "article_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" DROP COLUMN "category_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" DROP COLUMN "unit_price"`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" DROP COLUMN "reference_code"`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" DROP COLUMN "label"`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" DROP COLUMN "delete_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" DROP COLUMN "update_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" DROP COLUMN "creation_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" DROP CONSTRAINT "PK_40808690eb7b915046558c0f81b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" DROP COLUMN "id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" ADD "category_id" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" ADD "unit_price" double precision NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" ADD "reference_code" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" ADD "label" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" ADD "delete_date" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" ADD "update_date" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" ADD "creation_date" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" ADD "id" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "esayinventory"."article" ADD CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`DROP TABLE "easyinventory"."inventory"`);
    await queryRunner.query(`DROP TYPE "easyinventory"."inventory_type_enum"`);
    await queryRunner.query(`DROP TABLE "easyinventory"."transaction"`);
    await queryRunner.query(
      `DROP TYPE "easyinventory"."transaction_type_enum"`,
    );
    await queryRunner.query(`DROP TABLE "esayinventory"."article"`);
    await queryRunner.query(`DROP TABLE "easyinventory"."category"`);
  }
}
