import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
import { Response } from "express";
import { AxiosError } from "axios";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = 500;
    let message = "Internal server error";

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (
        typeof exceptionResponse === "object" &&
        "message" in exceptionResponse
      ) {
        message = (exceptionResponse as any).message;
      } else {
        message = exceptionResponse as string;
      }
    } else if (exception instanceof AxiosError) {
      // Manejar errores de Axios (de los microservicios)
      status = exception.response?.status || 500;
      message = exception.response?.data?.message || exception.message;
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    //*Envío el error
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
