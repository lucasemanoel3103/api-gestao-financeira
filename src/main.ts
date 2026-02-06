/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove campos do JSON que não estão no DTO
      forbidNonWhitelisted: true,
      transform: true, // Converte tipos automaticamente (ex: string para number)
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
