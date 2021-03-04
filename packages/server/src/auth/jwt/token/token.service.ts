import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { SignInModel } from 'auth/dto/sign-in.model';
import { UserEntity } from 'auth/users/users.entity';
import { Env } from 'common/_utils';

type SimpleUser = Pick<UserEntity, 'email' | 'id' | 'count' | 'roles'>;

@Injectable()
export class TokenService {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  generate(user: SimpleUser): SignInModel {
    return {
      accessToken: this.generateAccessToken(user),
      refreshToken: this.generateRefreshToken(user),
    };
  }

  generateAccessToken(user: SimpleUser) {
    return this.jwt.sign({ sub: { id: user.id, roles: user.roles } });
  }

  generateRefreshToken(user: SimpleUser) {
    const payload = {
      count: user.count,
      sub: {
        id: user.id,
        count: user.count,
      },
    };
    const options = {
      expiresIn: this.config.get(Env.REFRESH_TOKEN_DURATION),
    };

    return this.jwt.sign(payload, options);
  }
}
