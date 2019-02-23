import { ApiModelProperty } from '@nestjs/swagger';

export class InputUserUpdateModel {
  @ApiModelProperty()
  username: string;
  @ApiModelProperty()
  email: string;
  @ApiModelProperty()
  firstName: string;
  @ApiModelProperty()
  lastName: string;
}
