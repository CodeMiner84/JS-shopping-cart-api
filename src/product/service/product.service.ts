import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Product } from '../interfaces/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductEntity')
    private readonly productModel: Model<any>,
  ) {}

  async getAll(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }
}
