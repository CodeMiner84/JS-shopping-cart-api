import { Connection } from 'mongoose';
import { CartItemSchema } from '../schemas/cart.schema';
import { CART_ENTITY, CART_DOCUMENT } from '../constants';
import { DB_CONNECTION_TOKEN } from '../../database/constants';

export const cartProviders = [
  {
    provide: CART_ENTITY,
    useFactory: (connection: Connection) => connection.model(CART_DOCUMENT, CartItemSchema),
    inject: [DB_CONNECTION_TOKEN],
  },
];