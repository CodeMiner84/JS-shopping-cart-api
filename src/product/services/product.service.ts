import { Injectable, Inject } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from '../constants';
import { ProductRepository } from '../entity/product.repository';
import { ProductOutputModel } from '../dtos/prouct.output.model';
import { productFixtures } from '../tests/fixtures/product.mock';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}

  async getAll(): Promise<ProductOutputModel[]> {

    return await this.productRepository.findAll();
  }

  async import() {
    this.productRepository.loadFixtures(productFixtures);
    return {
      message: 'import finished',
    };
  }
}
