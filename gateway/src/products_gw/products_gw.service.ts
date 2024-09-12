import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { CreateProductsGwDto } from "./dto/create-products_gw.dto";
import { UpdateProductsGwDto } from "./dto/update-products_gw.dto";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { catchError, lastValueFrom, throwError } from "rxjs";

//todo: REVISAR QUE SON RETRIES Y CIRCUITS BREAKERS PARA IMPLEMENTARLOS
@Injectable()
export class ProductsGwService {
  constructor(private readonly httpService: HttpService) {}

  //!CREAR UN NUEVO OBJETO
  async createProduct(createProductsGwDto: CreateProductsGwDto) {
    const post = this.httpService.post(
      "http://localhost:3002/products/add",
      createProductsGwDto,
      {
        headers: { "Content-Type": "application/json" },
      },
    );

    const response: AxiosResponse<any> = await lastValueFrom(post);
    return response.data;
  }

  async update(id: number, updateProductsGwDto: UpdateProductsGwDto) {
    const update = this.httpService.patch(
      `http://localhost:3002/products/${id}`,
      updateProductsGwDto,
    );
    const response: AxiosResponse<any> = await lastValueFrom(update);
    return response.data;
  }

  async remove(id: number) {
    const deleted = this.httpService.delete(
      `http://localhost:3002/products/${id}`,
    );
    const response: AxiosResponse<any> = await lastValueFrom(deleted);
    return `Producto con id: ${id} ha sido eliminado`;
  }
}
