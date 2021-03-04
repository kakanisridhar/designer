import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { Roles } from '@nestjs-graphql-react/common';

export type ReqUser = { id: string; roles: Roles };

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): ReqUser => {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req.user;
  },
);
