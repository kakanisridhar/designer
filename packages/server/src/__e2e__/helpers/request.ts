import { INestApplication } from '@nestjs/common';
import request from 'supertest';

export function sendBasicRequest(app: INestApplication) {
  return request(app.getHttpServer()).post('/graphql');
}
