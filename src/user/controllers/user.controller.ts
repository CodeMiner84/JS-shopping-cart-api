import { Controller, Get, Post, Body, UseGuards, Patch, Res, HttpStatus } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { create } from 'domain';
import { AuthGuard } from '@nestjs/passport';
import { Connection } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { GetLoggedUser } from 'src/auth/helpers/selectors';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/list')
  async getAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update')
  async updateUser(@Res() res, @Body() body, @GetLoggedUser() user) {
    try {
      await this.userService.updateUser(body, user.id);
      res.status(HttpStatus.OK).end();
    } catch(error) {
      res.status(HttpStatus.FORBIDDEN).end();
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('change-password')
  async changePassword(@Res() res, @Body() body, @GetLoggedUser() user) {
    try {
      await this.userService.changePassword(body, user.id);
      res.status(HttpStatus.OK).end();
    } catch(error) {
      res.status(HttpStatus.FORBIDDEN).end();
    }
  }
}
