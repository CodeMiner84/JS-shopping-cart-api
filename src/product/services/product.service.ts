import { Injectable, Inject } from '@nestjs/common';
import { productFixtures } from '../fixtures/product.fixtures';
import { PRODUCT_REPOSITORY } from '../constants';
import { fixtureCreator, many, one } from 'typeorm-fixtures';
import { Product } from '../entity/product.entity';
import { ProductRepository } from '../entity/product.repository';

export const createUsersFixture = fixtureCreator<Product>(Product, (
  entity,
) => ({
    ean: entity.ean,
    title: entity.title,
    description: entity.description,
    image: entity.image,
    price: entity.price,
    isActive: entity.isActive,
    created: new Date(),
}));

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}

  async getAll(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  async import() {
    this.productRepository.loadFixtures(productFixtures);
    return {
      message: 'import finished',
    };
  }
}
