import Joi from '@hapi/joi';
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import path from 'path';

import { NodeEnv } from '@nestjs-graphql-react/common';
import { Env } from 'common/_utils';
import graphqlConfig, { GRAPHQL_CONFIG_KEY } from '_config/graphql';
import loggerConfig, { LogLvl, LOGGER_CONFIG_KEY } from '_config/logger';
import ormConfig, { ORM_CONFIG_KEY } from '_config/orm';

export const configSchema = Joi.object({
  [Env.NODE_ENV]: Joi.string()
    .valid(...Object.values(NodeEnv))
    .required(),
  [Env.HOST]: Joi.string().default('0.0.0.0'),
  [Env.PORT]: Joi.number().required(),
  [Env.LOG_LVL]: Joi.string().default(LogLvl[process.env.NODE_ENV]),
  [Env.JWT_SECRET]: Joi.string().required(),
  [Env.ACCESS_TOKEN_DURATION]: Joi.string().default('360s'),
  [Env.REFRESH_TOKEN_DURATION]: Joi.string().default('360d'),
  [Env.ADMIN_EMAIL]: Joi.string().email().required(),
  [Env.ADMIN_PASS]: Joi.string().required(),
  [Env.POSTGRES_DB]: Joi.string().required(),
  [Env.POSTGRES_MULTIPLE_DATABASES]: Joi.string(),
  [Env.POSTGRES_HOST]: Joi.string().required(),
  [Env.POSTGRES_PASSWORD]: Joi.string().required(),
  [Env.POSTGRES_PORT]: Joi.number().required(),
  [Env.POSTGRES_USER]: Joi.string().required(),
});

const currentEnv = process.env.NODE_ENV as NodeEnv;
const envWithEnvFiles = [NodeEnv.TEST, NodeEnv.DEV];

const rawOptions: ConfigModuleOptions = {
  isGlobal: true,
  ignoreEnvFile: envWithEnvFiles.includes(currentEnv),
  validationSchema: configSchema,
  load: [graphqlConfig, loggerConfig, ormConfig],
  envFilePath: [
    path.resolve(process.cwd(), `.env.${currentEnv}`),
    path.resolve(process.cwd(), '..', '..', `.env.${currentEnv}`),
    path.resolve(process.cwd(), `.database.local.env`),
  ],
};

export { GRAPHQL_CONFIG_KEY, LOGGER_CONFIG_KEY, ORM_CONFIG_KEY };

export default rawOptions;
