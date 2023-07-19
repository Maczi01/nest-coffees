import { DataSource } from 'typeorm';
import { CoffeeRefactor1689721357962 } from './src/migrations/1689721357962-CoffeeRefactor';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123',
  database: 'postgres',
  entities: [],
  migrations: [CoffeeRefactor1689721357962],
});
