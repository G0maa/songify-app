import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  RequestMethod,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { HttpAdapterHost } from '@nestjs/core';

// This will probably have to reflect main.ts
// e.g. app.useGlobalPipes(new ValidationPipe());
export const getApp = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app: INestApplication = moduleFixture.createNestApplication();

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });

  app.useGlobalPipes(new ValidationPipe());

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.init();
  return app;
};
