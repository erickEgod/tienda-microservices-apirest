import { Injectable } from "@nestjs/common";
import { RegisterUserDto } from "./dto/register-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { HttpService } from "@nestjs/axios";
import { Axios, AxiosResponse } from "axios";
import { last, lastValueFrom } from "rxjs";

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async register(registerUserDto: RegisterUserDto) {
    const register = this.httpService.post(
      "http://localhost:3003/users/register",
      registerUserDto,
    );
    const response: AxiosResponse<string> = await lastValueFrom(register);
    return response.data;
  }

  async login(loginUserDto: LoginUserDto) {
    const login = this.httpService.post(
      "http://localhost:3003/users/login",
      loginUserDto,
    );
    const response: AxiosResponse<string> = await lastValueFrom(login);
    return response.data;
  }

  async findOne(id: number) {
    const find = this.httpService.get(`http://localhost:3003/users/${id}`);
    const response: AxiosResponse<string> = await lastValueFrom(find);
    return response.data;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const update = this.httpService.patch(
      `http://localhost:3003/users/update/${id}`,
      updateUserDto,
    );
    const response: AxiosResponse<string> = await lastValueFrom(update);
    return response.data;
  }

  async remove(id: number) {
    const remove = this.httpService.delete(
      `http://localhost:3003/users/delete/${id}`,
    );
    const response: AxiosResponse<string> = await lastValueFrom(remove);
    return response.data;
  }
}
