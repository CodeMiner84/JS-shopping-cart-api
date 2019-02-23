import { Controller, Get, UseGuards, Body, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';
import { UseFilters } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserService } from '../../user/services/user.service';
import { GetLoggedUser } from '../helpers/selectors';
import { User } from '../../user/entity/user.entity';
import { UserLoginInputModel } from '../../user/dtos/user-login.input.model';
import { HttpExceptionFilter } from '../../common/exceptions/exception-filter';
import { UserLoginOutputModel } from '../../user/dtos/user-login.output.model';

@UseFilters(new HttpExceptionFilter())
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    ) {}

  @ApiResponse({ status: 200, description: 'User logged in'})
  @ApiResponse({ status: 403, description: 'Wrong user'})
  @Post('login')
  async login(@Body() user: UserLoginInputModel): Promise<UserLoginOutputModel> {
    await this.userService.findAll();
    const authUser = await this.userService.findByEmailAndPassword(user);

    if (authUser == null) {
      throw new HttpException('Wrong user', HttpStatus.FORBIDDEN);
    }

    const token = await this.authService.createToken(authUser.email);
    return {
      user: {
        id: authUser.id,
        username: authUser.username,
        email: authUser.email,
        firstName: authUser.firstName,
        lastName: authUser.lastName,
      },
      token,
    };
  }

  @ApiResponse({ status: 200, description: 'User fetched successful'})
  @ApiResponse({ status: 404, description: 'No token provided'})
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  findAll(@GetLoggedUser() user): Promise<UserLoginOutputModel> {
    if (!user) {
      throw new HttpException('No token provided', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  @ApiResponse({ status: 200, description: 'Register successful'})
  @ApiResponse({ status: 409, description: 'Duplicate entity'})
  @ApiResponse({ status: 404, description: 'Not found'})
  @Post('/register')
  async create(@Body() user: User): Promise<UserLoginOutputModel> {
    const authUser = await this.userService.create(user);

    const token = await this.authService.createToken(user.email);

    return {
      user: authUser,
      token,
    };
  }
}
