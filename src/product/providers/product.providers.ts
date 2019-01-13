import { Connection } from 'mongoose';
import { ProductSchema } from '../schema/product.schema';

export const productProviders = [
  {
    provide: 'ProductEntity',
    useFactory: (connection: Connection) => connection.model('Product', ProductSchema),
    inject: ['DbConnectionToken'],
  },
];