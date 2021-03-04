import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { AuthResolver } from 'auth/auth.resolver';
import { JwtModule } from 'auth/jwt/jwt.module';

@Module({
  imports: [JwtModule, ConfigModule, PassportModule],
  providers: [AuthResolver],
})
export class AuthModule {}
