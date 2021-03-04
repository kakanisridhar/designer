import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';

import { NodeEnv } from '@nestjs-graphql-react/common';
import { loggerConfig } from '_config/logger';
import { AppModule, prepareApp } from 'app.module';
import { Env } from 'common/_utils';

(async () => {
  const logger = WinstonModule.createLogger(loggerConfig);

  try {
    const app = await NestFactory.create(AppModule, {
      logger:
        process.env.NODE_ENV !== NodeEnv.PROD
          ? WinstonModule.createLogger(loggerConfig)
          : false,
    });
    const config = app.get(ConfigService);

    await prepareApp(app).listen(
      config.get(Env.PORT),
      config.get(Env.HOST),
      () => {
        logger.log(
          `Graphql api is listening on port ${config.get(Env.PORT)}`,
          'Http',
        );
      },
    );
  } catch (err) {
    logger.warn('Something fail while bootstraping :(');
    logger.error(err.message);
  }
})();
