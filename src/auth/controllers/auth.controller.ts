import { Controller, Get, UseGuards, Body, HttpException, HttpStatus, Post, Request, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';
import { UseFilters } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserService } from '../../user/services/user.service';
import { GetLoggedUser } from '../helpers/selectors';
import { User } from '../../user/entity/user.entity';
import { DuplicateException } from '../../common/exceptions/duplicate-exception';
import { UserLoginInputModel } from '../../user/dtos/user-login.input.model';
import { AlreadyExistsException } from '../../user/exceptions/already.exist.exception';
import { NotFoundException } from '../../user/exceptions/not-found.exception';
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
    const authUser = await this.userService.findByEmailAndPassword(user);

    if (authUser == null) {
      throw new HttpException('Wrong user', HttpStatus.FORBIDDEN);;
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
    // if (!user) {
    //   res.status(500).send({
    //     auth: false,
    //     error: 'No token provided',
    //   });
    // }

    // return res.status(200).json(user);
  }

  @ApiResponse({ status: 200, description: 'Register successful'})
  @ApiResponse({ status: 409, description: 'User already exists'})
  @ApiResponse({ status: 401, description: 'Something goes wrong'})
  @Post('/register')
  async create(@Body() user: User) {
    // try {
    //   const authUser = await this.userService.create(user);
    //   delete authUser.password;

    //   const token = await this.authService.createToken(user.email);

    //   res.status(200).json({
    //     user: authUser,
    //     token,
    //   });
    // } catch (error) {
    //   if (error instanceof DuplicateException) {
    //     return res.status(409).json({message: 'User already exists'});
    //   } else if (error instanceof UnauthorizedException) {
    //     return res.status(401).json({message: 'Something goes wrong'});
    //   }

    //   return res.status(409).json({message: 'User already exists'});
    // }
  }
}
