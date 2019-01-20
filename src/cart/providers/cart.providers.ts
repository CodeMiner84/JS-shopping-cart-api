import { Connection } from 'mongoose';
import { CART_REPOSITORY } from '../constants';
import { DB_CONNECTION_TOKEN } from '../../database/constants';
import { CartItemRepository } from '../entity/cart.repository';

export const cartProviders = [
  {
    provide: CART_REPOSITORY,
    useFactory: (connection: Connection) => connection.getCustomRepository(CartItemRepository),
    inject: [DB_CONNECTION_TOKEN],
  },
];
