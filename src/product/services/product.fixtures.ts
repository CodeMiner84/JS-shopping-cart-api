import { fixtureCreator } from 'typeorm-fixtures';
import { Product } from '../entity/product.entity';
export const createProductFixtures = fixtureCreator<Product>(Product, (
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
