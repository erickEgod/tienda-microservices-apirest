import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "./dto/register-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { JwtAuthGuard } from "../common/guards/jwt.auth.guard";
import { RoleGuard } from "../common/guards/role.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { Role } from "../common/enums/role.enum";
import { User } from "../common/interfaces/user.interface";
import { CurrentUserDecorator } from "../common/decorators/current-user.decorator";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("users")
@Controller("users")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/register")
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Post("/login")
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get("/myUser")
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RoleGuard)
  findOne(@CurrentUserDecorator() user: User) {
    return this.authService.findOne(user.userId);
  }

  @Patch("/update/")
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RoleGuard)
  update(
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUserDecorator() user: User,
  ) {
    return this.authService.update(user.userId, updateUserDto);
  }

  @Delete("/delete/")
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RoleGuard)
  remove(@CurrentUserDecorator() user: User) {
    return this.authService.remove(user.userId);
  }
}
