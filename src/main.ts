import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './common/config';
import { CustomLogger } from './logger/CustomLogger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(CustomLogger));
  await app.listen(PORT || 4000);
}
bootstrap();
