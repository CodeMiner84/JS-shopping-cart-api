import { ApiModelProperty } from '@nestjs/swagger';

export class UserLoginInputModel {
  @ApiModelProperty()
  email: string;
  @ApiModelProperty()
  password: string;
}