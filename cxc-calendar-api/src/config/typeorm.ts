//-------------------------//
//-------Librerias---------//
import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';

//-------------------------//
//----------.env-----------//
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from './envs.js';

//-------------------------//
//------AppDataSource------//
//-------------------------//
const config = {
  type: 'postgres',
  host: DB_HOST || 'localhost',
  port: DB_PORT || 5432,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: true,
  dropSchema: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  subscribers: [],
  migrations: ['dist/migrations/*{.ts,.js}'],
};
export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config as DataSourceOptions);