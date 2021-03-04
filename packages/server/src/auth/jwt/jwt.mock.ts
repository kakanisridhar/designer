import { createMock } from 'ts-auto-mock';

import { TokenService } from 'auth/jwt/token/token.service';

export const tokenServiceMock = {
  provide: TokenService,
  useValue: createMock<TokenService>(),
};
