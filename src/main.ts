import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Lấy ConfigService từ AppModule
  const configService = app.get(ConfigService);

  // Sử dụng ConfigService để lấy biến môi trường
  const port = configService.get<number>('PORT') || 3000;

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
