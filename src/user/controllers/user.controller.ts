import { Controller, Get, Post, Body, UseGuards, Patch, Res, HttpStatus } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../user/entity/user.entity';
import { GetLoggedUser } from '../../auth/helpers/selectors';
import { InputUserUpdateModel } from '../dtos/input.user-update.model';
import { InputChangePasswordModel } from '../dtos/input.change-password.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: 200, description: 'User list loaded'})
  @Get('/list')
  async getAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @ApiResponse({ status: 200, description: 'User updated'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('update')
  async updateUser(@Body() body: InputUserUpdateModel, @GetLoggedUser() user): Promise<void> {
    await this.userService.updateUser(body, user.id);
  }

  @ApiResponse({ status: 200, description: 'Password changed'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('change-password')
  async changePassword(@Res() res, @Body() body: InputChangePasswordModel, @GetLoggedUser() user): Promise<void> {
    await this.userService.changePassword(body, user.id);
  }
}
