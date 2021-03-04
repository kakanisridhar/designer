import { registerEnumType } from '@nestjs/graphql';

import { Roles } from '@nestjs-graphql-react/common';

export enum Env {
  DEBUG = 'DEBUG',
  HOST = 'HOST',
  PORT = 'PORT',
  NODE_ENV = 'NODE_ENV',
  JWT_SECRET = 'JWT_SECRET',
  REFRESH_TOKEN_DURATION = 'REFRESH_TOKEN_DURATION',
  ACCESS_TOKEN_DURATION = 'ACCESS_TOKEN_DURATION',
  ADMIN_EMAIL = 'ADMIN_EMAIL',
  ADMIN_PASS = 'ADMIN_PASS',
  LOG_LVL = 'LOG_LVL',
  POSTGRES_USER = 'POSTGRES_USER',
  POSTGRES_PASSWORD = 'POSTGRES_PASSWORD',
  POSTGRES_DB = 'POSTGRES_DB',
  POSTGRES_HOST = 'POSTGRES_HOST',
  POSTGRES_PORT = 'POSTGRES_PORT',
  POSTGRES_MULTIPLE_DATABASES = 'POSTGRES_MULTIPLE_DATABASES',
}

registerEnumType(Roles, {
  name: 'Roles',
});

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(Order, {
  name: 'Order',
});
