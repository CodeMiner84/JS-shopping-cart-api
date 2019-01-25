import { Connection } from 'mongoose';
import { DB_CONNECTION_TOKEN } from '../../database/constants';
import { OrderItemRepository } from '../entity/order-item.repository';
import { ORDER_ITEM_REPOSITORY } from '../constants';

export const orderItemProviders = [
  {
    provide: ORDER_ITEM_REPOSITORY,
    useFactory: (connection: Connection) => connection.getCustomRepository(OrderItemRepository),
    inject: [DB_CONNECTION_TOKEN],
  },
];
