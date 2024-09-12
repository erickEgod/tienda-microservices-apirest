import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "../interfaces/user.interface";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  handleRequest(
    err: Error | null,
    user: User | any,
    context: ExecutionContext,
  ) {
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException(
          "Acceso no autorizado: debes estar autenticado",
        )
      );
    }
    return user;
  }
}
