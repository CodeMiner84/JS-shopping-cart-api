import { Controller, Get } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ProductOutputModel } from '../dtos/prouct.output.model';
import { ApiResponse } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) {}

  @ApiResponse({ status: 200, description: 'Get all products'})
  @Get('/list')
  getAll(): Promise<ProductOutputModel[]> {
    return this.productService.getAll();
  }

  @ApiResponse({ status: 200, description: 'Products loaded'})
  @Get('/import')
  async import() {
    return await this.productService.import();
  }
}
