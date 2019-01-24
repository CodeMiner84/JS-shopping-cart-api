import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { ProductModule } from '../product.module';
import { ProductService } from '../services/product.service';
import { INestApplication } from '@nestjs/common';
import { productFixtures } from '../fixtures/product.fixtures';

describe('Cats', () => {
  let app: INestApplication;
  const productService = { getAll: () => productFixtures };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ProductModule],
    })
      .overrideProvider(ProductService)
      .useValue(productService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`/GET product list`, () => {
    return request(app.getHttpServer())
      .get('/product/list')
      .expect(200)
      .expect(
        productService.getAll(),
      );
  });

  afterAll(async () => {
    await app.close();
  });
});