import { Connection } from 'mongoose';
import { PRODUCT_REPOSITORY } from '../constants';
import { DB_CONNECTION_TOKEN } from '../../database/constants';
import { ProductRepository } from '../entity/product.repository';

export const productProviders = [
  {
    provide: PRODUCT_REPOSITORY,
    useFactory: (connection: Connection) => connection.getCustomRepository(ProductRepository),
    inject: [DB_CONNECTION_TOKEN],
  },
];