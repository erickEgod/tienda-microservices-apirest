import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PageService {
  constructor(private readonly httpService: HttpService) {}

  async findAllProducts() {
    const get = this.httpService.get('http://localhost:3002/products/all');
    //todo: CREAR INTERFACE PARA RESPONSE
    const response: AxiosResponse<any> = await lastValueFrom(get);
    return response.data;
  }

  async findOneProduct(id: number) {
    try {
      const get = this.httpService.get(`http://localhost:3002/products/${id}`);
      //todo: CREAR INTERFACE PARA RESPONSE
      const response: AxiosResponse<any> = await lastValueFrom(get);
      return response.data;
    } catch (e) {
      throw new ConflictException(e.response?.data);
    }
  }
}
