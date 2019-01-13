import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user.interface';
import { create } from 'domain';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/list')
  async getAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Post('/register')
  async create(@Body() user: User) {
    return this.userService.create(user);
  }
}
