import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserService } from '../user/services/user.service';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from '../user/providers/user.providers';
import { MailerModule } from '../mailer/mailer.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    forwardRef(() => MailerModule)
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy,
    ...userProviders,
  ],
})
export class AuthModule {}
