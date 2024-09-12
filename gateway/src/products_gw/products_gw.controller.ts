import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ProductsGwService } from "./products_gw.service";
import { CreateProductsGwDto } from "./dto/create-products_gw.dto";
import { UpdateProductsGwDto } from "./dto/update-products_gw.dto";
import { RoleGuard } from "src/common/guards/role.guard";
import { Role } from "src/common/enums/role.enum";
import { Roles } from "src/common/decorators/roles.decorator";
import { JwtAuthGuard } from "src/common/guards/jwt.auth.guard";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("products")
@Roles(Role.Admin)
@UseGuards(JwtAuthGuard, RoleGuard)
@Controller("products-gw")
export class ProductsGwController {
  constructor(private readonly productsGwService: ProductsGwService) {}

  //!CREAR UN NUEVO OBJETO
  @Post()
  createProduct(@Body() createProductsGwDto: CreateProductsGwDto) {
    return this.productsGwService.createProduct(createProductsGwDto);
  }

  @Patch(":id")
  update(
    @Param("id") id: number,
    @Body() updateProductsGwDto: UpdateProductsGwDto,
  ) {
    return this.productsGwService.update(id, updateProductsGwDto);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.productsGwService.remove(id);
  }
}
