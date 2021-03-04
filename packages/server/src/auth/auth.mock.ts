import { createMock } from 'ts-auto-mock';

import { AuthService } from 'auth/auth.service';

export const authServiceMock = {
  provide: AuthService,
  useValue: createMock<AuthService>(),
};
