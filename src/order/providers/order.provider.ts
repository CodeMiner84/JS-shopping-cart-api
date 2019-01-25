import { Connection } from 'mongoose';
import { DB_CONNECTION_TOKEN } from '../../database/constants';
import { ORDER_REPOSITORY } from '../constants';
import { OrderRepository } from '../entity/order.repository';

export const orderProviders = [
  {
    provide: ORDER_REPOSITORY,
    useFactory: (connection: Connection) => connection.getCustomRepository(OrderRepository),
    inject: [DB_CONNECTION_TOKEN],
  },
];
