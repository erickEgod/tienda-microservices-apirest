import { Controller, Get, Param, Post } from "@nestjs/common";
import { GatewayService } from "./gateway.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("principal_page")
@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}
  //!OBTENER TODOS LOS PRODUCTOS
  @Get("/")
  principalPage() {
    return this.gatewayService.principalPage();
  }

  //!OBTENER UN PRODUCTO EN LA PÁGINA
  @Get("/:id")
  oneProductPage(@Param("id") id: number) {
    return this.gatewayService.oneProductPage(id);
  }
}
