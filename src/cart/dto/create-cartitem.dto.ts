import { ApiModelProperty } from '@nestjs/swagger';
import { Product } from '../../product/entity/product.entity';

export class CreateCartItem {
  @ApiModelProperty()
  productId: number;
  @ApiModelProperty()
  product: Product;
  @ApiModelProperty()
  title: string;
  @ApiModelProperty()
  price: number;
  @ApiModelProperty()
  quantity: number;
}
