import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Env } from 'common/_utils';
import { ReqUser } from 'auth/current-user/current-user.decorator';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(ConfigService) configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(Env.JWT_SECRET),
    });
  }

  async validate(payload: { sub: ReqUser }) {
    return { id: payload.sub.id, roles: payload.sub.roles };
  }
}
