import { Connection } from 'mongoose';
import { CART_REPOSITORY } from '../constants';
import { DB_CONNECTION_TOKEN } from '../../database/constants';
import { CartItem } from '../entity/cart.entity';

export const cartProviders = [
  {
    provide: CART_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(CartItem),
    inject: [DB_CONNECTION_TOKEN],
  },
];
