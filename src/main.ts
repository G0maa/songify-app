import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { requestLogger } from './common/middleware/reguestLogger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  // to-do will eventually need to use winston
  // and/or move to an injectable service
  configService.get('NODE_ENV') === 'dev' ? app.use(requestLogger) : null;

  // API Docs
  const config = new DocumentBuilder()
    .setTitle('X-Recommend-API')
    .setDescription('API Docs for X-Recommend-API, currently named Songify-App')
    .setVersion('0.1')
    .addBearerAuth()
    .addServer('http://localhost:8080')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(configService.get('PORT'));
}
bootstrap();
