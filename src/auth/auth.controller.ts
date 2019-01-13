import { Controller, Get, UseGuards, Body, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    ) {}

  @Post('token')
  async createToken(@Body() user: any): Promise<any> {
    const authUser = await this.userService.findByEmailAndPassword(user);

    if (authUser === null) {
      throw new HttpException('Email or password is wrong!', HttpStatus.NOT_FOUND);
    }

    return await this.authService.createToken();
  }

  @Get('data')
  @UseGuards(AuthGuard())
  findAll() {
    return 'true';
    // This route is restricted by AuthGuard
    // JWT strategy
  }
}
