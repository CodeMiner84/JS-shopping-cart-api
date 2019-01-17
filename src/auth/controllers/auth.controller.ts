import { Controller, Get, UseGuards, Body, HttpException, HttpStatus, Post, Request, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { UserService } from '../../user/services/user.service';
import { GetLoggedUser } from '../helpers/selectors';
import { User } from '../../user/interfaces/user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    ) {}

  @Post('login')
  async login(@Body() user: User, @Res() res): Promise<any> {
    const authUser = await this.userService.findByEmailAndPassword(user);

    if (authUser === null) {
      throw new HttpException('Email or password is wrong!', HttpStatus.NOT_FOUND);
    }

    const token = await this.authService.createToken(authUser.email);
    res.status(200).json({
      user: {
        ...authUser._doc,
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
      if (authUser === null) {
        return res.status(403).json({
          status: 403,
          message: 'User already exists',
        });
      }
      const token = await this.authService.createToken(user.email);

      delete authUser.password;
      res.status(200).json({
        user: authUser,
        token,
      });
    } catch (e) {
      res.status(500).json({
        message: e.message,
      });
    }
  }
}
