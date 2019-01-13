import { Connection } from 'mongoose';
import { UserSchema } from './user.schema';
import { DB_CONNECTION_TOKEN } from '../database/constants';

export const userProviders = [
  {
    provide: 'UserModelToken',
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: [DB_CONNECTION_TOKEN],
  },
];
