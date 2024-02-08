import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();
const host = process.env.TYPEORM_HOST;
const username = process.env.TYPEORM_USERNAME;
const password = process.env.TYPEORM_PASSWORD;
const port = process.env.TYPEORM_PORT;
const dbName = process.env.TYPEORM_DATABASE;

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host,
  port: parseInt(port),
  username,
  password,
  database: dbName,
  synchronize: false,
  migrationsRun: true,
  entities: ['dist/src/database/entities/**/*.entity.js'],
  migrationsTableName: 'migration',
  metadataTableName: 'metadataTableName',
  migrations: ['dist/src/database/migrations/*.js'],
};

const datasource = new DataSource(dataSourceOptions);
export default datasource;
