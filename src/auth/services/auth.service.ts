import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../dtos/jwt-payload.interface';
import { UserService } from '../../user/services/user.service';
import { UserOutputModel } from '../../user/dtos/user.output.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    ) {}

  createToken(email: string): string {
    const user: JwtPayload = { email };
    return this.jwtService.sign(user);
  }

  async validateUser(payload: JwtPayload): Promise<UserOutputModel> {
    return await this.userService.findOneByEmail(payload.email);
  }
}
