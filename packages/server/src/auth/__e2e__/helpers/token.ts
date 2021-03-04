import jwt from 'jsonwebtoken';

import { Env } from 'common/_utils';

export function generateOutdatedAccessToken() {
  const token = jwt.sign(
    { sub: 'testId', count: 0 },
    process.env[Env.JWT_SECRET],
    {
      expiresIn: 0,
    },
  );

  return `Bearer ${token}`;
}
export function generateOutdatedRefreshToken() {
  return jwt.sign({ sub: 'testId', count: 0 }, process.env[Env.JWT_SECRET], {
    expiresIn: 0,
  });
}
