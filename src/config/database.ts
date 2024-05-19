import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const dataSource = new DataSource({
  type: process.env.DBTYPE as any,
  database: process.env.DBNAME,
  logging: process.env.DBLOGGING === 'true',
  entities: ['src/entities/*.ts'],
  synchronize: process.env.DBSYNC === 'true',
});
