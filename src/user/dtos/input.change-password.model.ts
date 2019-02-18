import { ApiModelProperty } from '@nestjs/swagger';

export class InputChangePasswordModel {
  @ApiModelProperty()
  oldPassword: string;
  @ApiModelProperty()
  newPassword: string;
}