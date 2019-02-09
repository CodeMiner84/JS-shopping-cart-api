import { Test } from '@nestjs/testing';
import { ProductModule } from '../product.module';
import { ProductService } from '../services/product.service';
import { ProductController } from '../controllers/product.controller';
import { productFixtures } from './fixtures/product.mock';
import { ProdcutFixturesModel } from '../dtos/product.fixtures.model';

describe('Products', () => {
  let productService: ProductService;
  let productController: ProductController;
  let mockProducts: ProdcutFixturesModel[] = productFixtures;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ProductModule],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    productController = new ProductController(productService);
  });

  it(`getAll should return all products`, async () => {
    jest.spyOn(productService, 'getAll').mockImplementation(() => mockProducts);
    expect(await productController.getAll()).toBe(mockProducts);
  });
});