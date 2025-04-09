import { DataSource } from 'typeorm';
import { Event } from './entities/Event';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '2708',
  database: 'eventdb',
  synchronize: true,
  logging: false,
  entities: [Event],
});
