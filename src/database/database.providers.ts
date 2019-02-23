import { createConnection } from 'typeorm';
import { DB_CONNECTION_TOKEN } from './constants';

export const databaseProviders = [
  {
    provide: DB_CONNECTION_TOKEN,
    useFactory: async () => await createConnection(),
  },
];
