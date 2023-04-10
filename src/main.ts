import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { requestLogger } from './common/middleware/reguestLogger.middleware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  // to-do will eventually need to use winston
  // and/or move to an injectable service
  configService.get('NODE_ENV') === 'dev' ? app.use(requestLogger) : null;

  await app.listen(configService.get('PORT'));
}
bootstrap();
