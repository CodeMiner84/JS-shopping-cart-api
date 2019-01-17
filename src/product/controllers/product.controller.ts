import { Controller, Get, Res } from '@nestjs/common';
import { ProductService } from '../services/product.service';

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
  async import(@Res() res) {
    return res.status(200).json(await this.productService.import());
  }
}
