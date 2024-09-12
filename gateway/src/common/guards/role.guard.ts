import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../enums/role.enum";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    //*Obtengo el rol determinado en el decorador de la ruta
    const role = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    //*obtengo el user.role enviado en el guard de validación jwt
    const { user } = context.switchToHttp().getRequest();
    if (user.role === role || user.role === Role.Admin) return true;

    throw new UnauthorizedException(
      "Solo admins pueden acceder a este recurso",
    );
  }
}
