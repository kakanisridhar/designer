import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';

import jwtConfig, { JWT_CONFIG_KEY } from 'auth/jwt/_config/jwt';
import { JwtFilter } from 'auth/jwt/jwt.filter';
import { JwtGuard } from 'auth/jwt/jwt.guard';
import { JwtStrategy } from 'auth/jwt/jwt.strategy';
import { TokenService } from 'auth/jwt/token/token.service';
import { authJwtServiceProvider } from 'auth/jwt/auth/auth.service';
import { UsersModule } from 'auth/users/users.module';
import { CommonModule } from 'common/common.module';

@Module({
  imports: [
    CommonModule,
    UsersModule,
    HttpModule,
    ConfigModule.forFeature(jwtConfig),
    NestJwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => config.get(JWT_CONFIG_KEY),
      inject: [ConfigService],
    }),
  ],
  providers: [
    JwtFilter,
    JwtGuard,
    JwtStrategy,
    TokenService,
    authJwtServiceProvider,
    { provide: APP_GUARD, useClass: JwtGuard },
    { provide: APP_FILTER, useClass: JwtFilter },
  ],
  exports: [
    JwtFilter,
    JwtGuard,
    JwtStrategy,
    TokenService,
    authJwtServiceProvider,
  ],
})
export class JwtModule {}
