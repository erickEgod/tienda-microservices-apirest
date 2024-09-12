import { Module } from "@nestjs/common";
import { GatewayModule } from "./gateway/gateway.module";
import { ProductsGwModule } from "./products_gw/products_gw.module";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [GatewayModule, ProductsGwModule, AuthModule],
})
export class AppModule {}
