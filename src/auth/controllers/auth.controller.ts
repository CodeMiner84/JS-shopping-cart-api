import { Controller, Get, UseGuards, Body, HttpException, HttpStatus, Post, Request, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';
import { UseFilters } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserService } from '../../user/services/user.service';
import { GetLoggedUser } from '../helpers/selectors';
import { User } from '../../user/entity/user.entity';
import { UserLoginInputModel } from '../../user/dtos/user-login.input.model';
import { HttpExceptionFilter } from '../../common/exceptions/exception-filter';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    ) {}

  @UseFilters(new HttpExceptionFilter())
  @ApiResponse({ status: 200, description: 'User logged in'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @Post('login')
  async login(@Body() user: UserLoginInputModel) {
    const all = await this.userService.findAll();
    const authUser = await this.userService.findByEmailAndPassword(user);

    if (authUser == null) {
      throw new HttpException('Wrong user', HttpStatus.FORBIDDEN);
    }

    const token = await this.authService.createToken(authUser.email);
    return {
      user: {
        username: authUser.username,
        email: authUser.email,
        firstName: authUser.firstName,
        lastName: authUser.lastName,
      },
      token,
    };
  }

  @ApiResponse({ status: 200, description: 'Token checked correctly'})
  @ApiResponse({ status: 500, description: 'No token provided'})
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  findAll(@GetLoggedUser() user) {
    if (!user) {
      throw new HttpException('No token provided', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  @ApiResponse({ status: 200, description: 'Register successful'})
  @ApiResponse({ status: 409, description: 'User already exists'})
  @ApiResponse({ status: 401, description: 'Something goes wrong'})
  @Post('/register')
  async create(@Body() user: User) {
    const authUser = await this.userService.create(user);
    delete authUser.password;

    const token = await this.authService.createToken(user.email);

    return {
      user: authUser,
      token,
    };
  }
}
