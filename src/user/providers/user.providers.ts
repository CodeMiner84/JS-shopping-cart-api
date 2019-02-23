import { USER_REPOSITORY } from '../contastants';
import { Connection } from 'typeorm';
import { DB_CONNECTION_TOKEN } from '../../database/constants';
import { UserRepository } from '../entity/user.repository';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (connection: Connection) => connection.getCustomRepository(UserRepository),
    inject: [DB_CONNECTION_TOKEN],
  },
];
