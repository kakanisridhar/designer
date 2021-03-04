// import { LoggingWinston as gcpWinstonTransport } from '@google-cloud/logging-winston';
import { registerAs } from '@nestjs/config';
import { utilities as nestWinstonUtils } from 'nest-winston';

import winston, { LoggerOptions } from 'winston';

import { NodeEnv } from '@nestjs-graphql-react/common';
import { Env } from 'common/_utils';
import { StreamTransportInstance } from 'winston/lib/winston/transports';

type LogLvl =
  | 'error'
  | 'warn'
  | 'info'
  | 'http'
  | 'verbose'
  | 'debug'
  | 'silly';

// if LOG_LVL env is not specified infer it from NODE_ENV
export const LogLvl: Record<NodeEnv, LogLvl> = {
  [NodeEnv.STAGING]: 'warn',
  [NodeEnv.PROD]: 'error',
  [NodeEnv.DEV]: 'info',
  [NodeEnv.TEST]: 'error',
  [NodeEnv.LOCAL]: 'info',
};

const winstonTransport: StreamTransportInstance[] = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp(),
      nestWinstonUtils.format.nestLike(),
    ),
  }),
];

// if (process.env.NODE_ENV === NodeEnv.PROD)
//   winstonTransport.push(gcpWinstonTransport);

export const loggerConfig: LoggerOptions = {
  level: process.env[Env.LOG_LVL] || LogLvl[process.env.NODE_ENV],
  transports: winstonTransport,
};

export const LOGGER_CONFIG_KEY = 'logger';

export default registerAs(LOGGER_CONFIG_KEY, () => loggerConfig);
