import { Module, Res } from '@nestjs/common';
import { CartController } from './controllers/cart.controller';
import { CartService } from './services/cart.service';
import { DatabaseModule } from '../database/database.module';
import { cartProviders } from './providers/cart.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CartController],
  providers: [
    CartService,
    ...cartProviders,
  ],
})
export class CartModule {}
