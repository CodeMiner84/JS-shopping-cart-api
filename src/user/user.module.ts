import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { userProviders } from './providers/user.providers';
import { DatabaseModule } from '../database/database.module';
import { MailerModule } from '../mailer/mailer.module';

@Module({
  imports: [DatabaseModule, MailerModule, forwardRef(() => MailerModule)],
  controllers: [UserController],
  providers: [
    UserService,
     ...userProviders,
  ],
  exports: [UserService],
})
export class UserModule {}
