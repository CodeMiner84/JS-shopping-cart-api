import { OrderItemOutputModel } from './order-item.output.model';
import { ApiModelProperty } from '@nestjs/swagger';

export class OrderOutputModel {
  @ApiModelProperty()
  id: number;
  @ApiModelProperty()
  completed: boolean;
  @ApiModelProperty()
  createdAt: Date;
  @ApiModelProperty()
  price: number;
  @ApiModelProperty()
  userId: number;
  @ApiModelProperty()
  orderItems: OrderItemOutputModel[];
}
