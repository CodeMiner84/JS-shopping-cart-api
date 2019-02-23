import { ApiModelProperty } from '@nestjs/swagger';

export class OrderItemOutputModel {
  @ApiModelProperty()
  id: number;
  @ApiModelProperty()
  orderId: number;
  @ApiModelProperty()
  price: number;
  @ApiModelProperty()
  quantity: number;
  @ApiModelProperty()
  amount: number;
  @ApiModelProperty()
  title: string;
  @ApiModelProperty()
  createdAt: Date;
}