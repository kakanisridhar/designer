import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

import { Env } from 'common/_utils';

export const JWT_CONFIG_KEY = 'jwt';

export default registerAs(
  JWT_CONFIG_KEY,
  (): JwtModuleOptions => ({
    secret: process.env[Env.JWT_SECRET],
    signOptions: {
      expiresIn: process.env[Env.ACCESS_TOKEN_DURATION],
    },
  }),
);
