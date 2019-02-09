import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { create } from 'domain';
import { AuthGuard } from '@nestjs/passport';
import { Connection } from 'typeorm';
import { User } from 'src/user/entity/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/list')
  async getAll(): Promise<User[]> {
    return await this.userService.findAll();
  }
}
