import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { RequestMethod, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';

// This function got a little too long & messy.
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });

  app.useGlobalPipes(new ValidationPipe());

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  // API Docs
  // to-do: https://stackoverflow.com/questions/71060554/nestjs-swagger-documentation-based-on-versioning
  const config = new DocumentBuilder()
    .setTitle('X-Recommend-API')
    .setDescription('API Docs for X-Recommend-API, currently named Songify-App')
    .setVersion('0.1')
    .addBearerAuth()
    .addServer('http://localhost:8080')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
