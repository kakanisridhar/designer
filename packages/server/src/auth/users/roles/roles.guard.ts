import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { Roles } from '@nestjs-graphql-react/common';
import { IContext } from 'common/_utils';
import { restrictToMetaKey } from 'auth/users/roles/roles.decorator';
import { RolesGuard } from 'common/roles/roles.guard';

@Injectable()
export class LocalRolesGuard implements RolesGuard {
  constructor(private readonly reflector: Reflector) {}

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext<IContext>();

    return req;
  }

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const roles = this.reflector.get<Roles[]>(
      restrictToMetaKey,
      ctx.getHandler(),
    );

    if (!roles) return true;
    if (!req.user) return false;

    return req.user.roles.find((role: Roles) => roles.includes(role));
  }
}
