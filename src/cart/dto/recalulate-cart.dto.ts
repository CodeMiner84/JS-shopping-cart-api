import { ApiModelProperty } from '@nestjs/swagger';

export class RecalculateProps {
  @ApiModelProperty()
  readonly id: number;
  @ApiModelProperty()
  readonly quantity: number;
}
