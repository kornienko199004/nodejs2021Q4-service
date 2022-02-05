import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { PORT, USE_FASTIFY } from './common/config';
import { CustomLogger } from './logger/CustomLogger';

async function bootstrap(): Promise<void> {
  const app = USE_FASTIFY
    ? await NestFactory.create<NestFastifyApplication>(AppModule)
    : await NestFactory.create(AppModule);

  app.useLogger(app.get(CustomLogger));
  app.useGlobalPipes(app.get(ValidationPipe));
  await app.listen(PORT || 4000);
}
bootstrap();
