import { USER_REPOSITORY } from '../contastants';
import { Connection } from 'typeorm';
import { User } from '../entity/user.entity';
import { DB_CONNECTION_TOKEN } from '../../database/constants';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [DB_CONNECTION_TOKEN],
  },
];
