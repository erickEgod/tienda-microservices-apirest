import { HttpService } from "@nestjs/axios";
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";
import { AxiosResponse } from "axios";
import { lastValueFrom } from "rxjs";

@Injectable()
export class GatewayService {
  constructor(private readonly httpService: HttpService) {}

  //!Página principal
  async principalPage() {
    const get = this.httpService.get("http://localhost:3001/page");
    const response: AxiosResponse = await lastValueFrom(get);
    return response.data;
  }

  //!Obtener UN Producto
  async oneProductPage(id: number) {
    const get = this.httpService.get(`http://localhost:3001/page/${id}`);
    const response: AxiosResponse = await lastValueFrom(get);
    return response.data;
  }
}
