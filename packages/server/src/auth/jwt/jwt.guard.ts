import { ExecutionContext, Injectable, ContextType } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { IContext } from 'common/_utils';
import { Strategy, restrictMetaKey } from 'auth/auth.decorator';
import {
  ExpiredAccessTokenException,
  MissingRefreshTokenException,
} from 'auth/jwt/jwt.exception';

@Injectable()
export class JwtGuard extends PassportAuthGuard('jwt') {
  // eslint-disable-next-line @typescript-eslint/ban-types
  private handler: Function;
  constructor(private readonly reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const type = context.getType<ContextType & 'graphql'>();
    let req: Request;
    let ctx: GqlExecutionContext;

    switch (type) {
      case 'http':
        req = context.switchToHttp().getRequest();
        this.handler = context.getHandler();

        break;
      default:
        ctx = GqlExecutionContext.create(context);
        this.handler = ctx.getHandler();
        req = ctx.getContext<IContext>().req;
        break;
    }

    return req;
  }

  handleRequest(err: never, user: never, info: Error) {
    const restrictedType = this.reflector.get<Strategy>(
      restrictMetaKey,
      this.handler,
    );

    const isRestrictedJwt = restrictedType === Strategy.JWT;

    if (isRestrictedJwt && info && info.name === 'TokenExpiredError')
      throw new ExpiredAccessTokenException();

    if (
      isRestrictedJwt &&
      info &&
      info.name === 'Error' &&
      info.message === 'No auth token'
    )
      throw new MissingRefreshTokenException();

    if (isRestrictedJwt && info) throw info;

    return user;
  }
}
