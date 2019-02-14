import { Controller, Get, UseGuards, Body, HttpException, HttpStatus, Post, Request, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { UserService } from '../../user/services/user.service';
import { GetLoggedUser } from '../helpers/selectors';
import { User } from '../../user/entity/user.entity';
import { DuplicateException } from '../../common/exceptions/duplicate-exception';
import { UserLoginInputModel } from '../../user/dtos/user-login.input.model';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    ) {}

  @Post('login')
  async login(@Body() user: UserLoginInputModel, @Res() res) {
    const authUser = await this.userService.findByEmailAndPassword(user);

    if (authUser == null) {
      throw new HttpException('Email or password is wrong!', HttpStatus.NOT_FOUND);
    }

    const token = await this.authService.createToken(authUser.email);
    res.status(200).json({
      user: {
        username: authUser.username,
        email: authUser.email,
        firstName: authUser.firstName,
        lastName: authUser.lastName,
      },
      token,
    });
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  findAll(@Res() res, @GetLoggedUser() user) {
    if (!user) {
      res.status(500).send({
        auth: false,
        error: 'No token provided',
      });
    }

    return res.status(200).json(user);
  }

  @Post('/register')
  async create(@Body() user: User, @Res() res) {
    try {
      const authUser = await this.userService.create(user);
      delete authUser.password;

      const token = await this.authService.createToken(user.email);

      res.status(200).json({
        user: authUser,
        token,
      });
    } catch (error) {
      if (error instanceof DuplicateException) {
        return res.status(409).json({message: 'User already exists'});
      } else if (error instanceof UnauthorizedException) {
        return res.status(401).json({message: 'Something goes wrong!'});
      }

      return res.status(400).json({message: 'User already exists'});
    }
  }
}
