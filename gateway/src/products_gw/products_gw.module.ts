import { Module } from "@nestjs/common";
import { ProductsGwService } from "./products_gw.service";
import { ProductsGwController } from "./products_gw.controller";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  controllers: [ProductsGwController],
  providers: [ProductsGwService],
})
export class ProductsGwModule {}
