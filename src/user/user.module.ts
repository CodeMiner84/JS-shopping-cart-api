import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { userProviders } from './providers/user.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    UserService,
     ...userProviders,
  ],
  exports: [UserService],
})
export class UserModule {}
