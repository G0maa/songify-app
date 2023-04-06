import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

// This will probably have to reflect main.ts
// e.g. app.useGlobalPipes(new ValidationPipe());
export const getApp = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app: INestApplication = moduleFixture.createNestApplication();
  await app.init();

  return app.getHttpServer();
};
