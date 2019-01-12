import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost/nest'),
    DatabaseModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
