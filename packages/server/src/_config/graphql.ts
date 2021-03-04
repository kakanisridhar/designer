import { registerAs } from '@nestjs/config';
import { GqlModuleOptions } from '@nestjs/graphql';
import path from 'path';

import { NodeEnv } from '@nestjs-graphql-react/common';
import { IContext } from 'common/_utils';

export const GRAPHQL_CONFIG_KEY = 'graphql';

export default registerAs(
  GRAPHQL_CONFIG_KEY,
  (): GqlModuleOptions => ({
    autoSchemaFile:
      process.env.NODE_ENV === NodeEnv.TEST
        ? true
        : path.resolve(process.cwd(), 'schema.gql'),
    debug: Boolean(process.env.DEBUG),
    context: ({ req }): IContext => ({ req, res: req.res }),
    playground: process.env.NODE_ENV === NodeEnv.LOCAL,
  }),
);
