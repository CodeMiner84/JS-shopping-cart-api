import { Controller, Get } from '@nestjs/common';
import { ProductService } from '../service/product.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) {}

  @Get('/list')
  index() {
    return this.productService.getAll();
  }

  @Get('/import')
  import() {
    return this.productService.import();
  }
}
