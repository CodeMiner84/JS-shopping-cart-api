import { Injectable, Inject } from '@nestjs/common';
import { productFixtures } from '../fixtures/product.fixtures';
import { PRODUCT_REPOSITORY } from '../constants';
import { Repository } from 'typeorm';
import { fixtureCreator, many, one } from 'typeorm-fixtures';
import { Product } from '../entity/product.entity';

export const createUsersFixture = fixtureCreator<Product>(Product, (
  entity,
  index,
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
    private readonly productRepository: Repository<Product>,
  ) {}

  async getAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async import() {
    this.productRepository.clear();
    createUsersFixture(productFixtures);

    for (const fixture of productFixtures) {
      this.productRepository.save(fixture);
    }

    return {
      message: 'import finished',
    };
  }
}
