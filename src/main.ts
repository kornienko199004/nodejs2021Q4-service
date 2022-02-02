import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { PORT, USE_FASTIFY } from './common/config';
import { CustomLogger } from './logger/CustomLogger';

async function bootstrap(): Promise<void> {
  const app = USE_FASTIFY
    ? await NestFactory.create<NestFastifyApplication>(AppModule)
    : await NestFactory.create<NestExpressApplication>(AppModule);

  app.useLogger(app.get(CustomLogger));
  await app.listen(PORT || 4000);
}
bootstrap();
