import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';
import { getApp } from './helpers';

let app: INestApplication;
let api: supertest.SuperTest<supertest.Test>;
beforeAll(async () => {
  app = await getApp();
  api = supertest(app);
});

describe('AppController (e2e)', () => {
  it('/ (GET)', () => {
    return api.get('/').expect(200).expect('Hello World!');
  });
});
