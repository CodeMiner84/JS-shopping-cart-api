import { Connection } from 'mongoose';
import { PRODUCT_REPOSITORY, PRODUCT_DOCUMENT } from '../constants';
import { DB_CONNECTION_TOKEN } from '../../database/constants';
import { Product } from '../entity/product.entity';

export const productProviders = [
  {
    provide: PRODUCT_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Product),
    inject: [DB_CONNECTION_TOKEN],
  },
];