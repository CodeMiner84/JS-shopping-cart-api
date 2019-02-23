import { EntityRepository, Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProdcutFixturesModel } from '../dtos/product.fixtures.model';
import { createProductFixtures } from '../services/product.fixtures';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  findAll() {
    return this.createQueryBuilder('product').getMany();
  }

  loadFixtures(fixtures: ProdcutFixturesModel[]) {
    this.clear();
    createProductFixtures(fixtures);

    for (const fixture of fixtures) {
      this.save(fixture);
    }
  }
}
