import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //*Si se mandan datos de más no los toma en cuenta
      forbidNonWhitelisted: true, //*Lanza una excepción si se encuentran 							propiedades no definidas en el DTO.
      transform: true, //* transforma a números los id
    }),
  );
  await app.listen(3001);
}
bootstrap();
