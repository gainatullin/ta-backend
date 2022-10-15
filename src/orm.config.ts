import { DataSource } from 'typeorm';

export const AppDataSource: any = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1234',
  database: 'backend',
  entities: ['dist/**/*.entity.js'],
  logging: false,
  synchronize: true, // if migrations = false,
  // migrationsRun: false,
  // migrations: ['dist/**/migrations/*.js'],
});
