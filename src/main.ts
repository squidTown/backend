import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common"
import * as cookieParser from 'cookie-parser';
import { JwtAuthGuard } from './auth/auth.jwt.guard';
import { HttpExceptionFilter } from './error/httpExceptionFilter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe({
    whitelist :true,
    forbidNonWhitelisted : true,
    transform : true
  }))
  app.useGlobalFilters(new HttpExceptionFilter())
  app.use(cookieParser())
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3000',
    exposedHeaders: ['Authorization'],
  });
  await app.listen(3001);
}
bootstrap();
