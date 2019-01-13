import { Controller, Get, UseGuards, Body, HttpException, HttpStatus, Post, Request, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { UserService } from '../../user/services/user.service';
import { GetLoggedUser } from '../helpers/selectors';

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

    return await this.authService.createToken(authUser.email);
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
}
