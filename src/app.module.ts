import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    // ProductModule,
    // CartModule,
  ],
})
export class AppModule {}
