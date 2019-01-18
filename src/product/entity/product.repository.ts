import { EntityRepository, Repository, Connection } from 'typeorm';
import { Product } from './product.entity';
import { createUsersFixture } from '../services/product.service';
import { ProductFixturesProps } from '../fixtures/product.fixtures';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  findAll() {
    return this.createQueryBuilder('product').getMany();
  }

  loadFixtures(fixtures: ProductFixturesProps[]) {
    this.clear();
    createUsersFixture(fixtures);

    for (const fixture of fixtures) {
      this.save(fixture);
    }
  }
}
