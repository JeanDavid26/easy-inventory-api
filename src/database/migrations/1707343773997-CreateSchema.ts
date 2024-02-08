import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSchema1707343773997 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS easyinventory`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropSchema('easyinventory');
  }
}
