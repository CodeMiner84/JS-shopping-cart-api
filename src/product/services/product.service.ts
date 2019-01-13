import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Product } from '../interfaces/product.dto';
import * as fixtures from 'node-mongoose-fixtures';
import * as mongoose from 'mongoose';
import { productFixtures } from '../fixtures/product.fixtures';
import { PRODUCT_ENTITY } from '../constants';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_ENTITY)
    private readonly productModel: Model<any>,
  ) {}

  async getAll(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async import() {
    this.productModel.remove().exec();
    fixtures(productFixtures, mongoose);
    
    return 'import finished';
  }
}
