import { Connection } from 'mongoose';
import { ProductSchema } from '../schemas/product.schema';
import { PRODUCT_ENTITY, PRODUCT_DOCUMENT } from '../constants';
import { DB_CONNECTION_TOKEN } from '../../database/constants';

export const productProviders = [
  {
    provide: PRODUCT_ENTITY,
    useFactory: (connection: Connection) => connection.model(PRODUCT_DOCUMENT, ProductSchema),
    inject: [DB_CONNECTION_TOKEN],
  },
];