import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Product } from '../interfaces/product.dto';
import * as fixtures from 'node-mongoose-fixtures';
import * as mongoose from 'mongoose';
import { productFixtures } from '../fixtures/product.fixtures';

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductEntity')
    private readonly productModel: Model<any>,
  ) {}

  async getAll(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async import() {
    mongoose.connection.dropDatabase('Product');
    fixtures(productFixtures, mongoose);
    return 'import finished';
  }
}
