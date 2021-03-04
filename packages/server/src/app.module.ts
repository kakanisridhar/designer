import {
  HttpModule,
  Module,
  INestApplication,
  ValidationPipe,
  CanActivate,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminusModule } from '@nestjs/terminus';
import helmet from 'helmet';
import { WinstonModule } from 'nest-winston';

import configOptions, {
  GRAPHQL_CONFIG_KEY,
  ORM_CONFIG_KEY,
  LOGGER_CONFIG_KEY,
} from '_config/config';
import { AppController } from 'app.controller';
import { AuthModule } from 'auth/auth.module';
import { JwtFilter } from 'auth/jwt/jwt.filter';
import { JwtGuard } from 'auth/jwt/jwt.guard';
import { UsersModule } from 'auth/users/users.module';
import { CommonModule } from 'common/common.module';
import { RolesGuard } from 'common/roles/roles.guard';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CommonModule,

    HttpModule,
    TerminusModule,
    ConfigModule.forRoot(configOptions),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get(GRAPHQL_CONFIG_KEY),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get(ORM_CONFIG_KEY),
      inject: [ConfigService],
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get(LOGGER_CONFIG_KEY),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}

export function prepareApp(app: INestApplication) {
  const roleGuard = app.get(RolesGuard);
  const jwtFilter = app.get(JwtFilter);
  const jwtGuard = app.get(JwtGuard);

  const guards: CanActivate[] = [jwtGuard];

  if (roleGuard) guards.push(roleGuard);

  app.useGlobalFilters(jwtFilter);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(...guards);
  app.use(helmet());
  app.enableShutdownHooks();
  app.enableCors();

  return app;
}
