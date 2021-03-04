import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from 'auth/auth.service';
import { authJwtServiceProvider } from 'auth/jwt/auth/auth.service';
import { tokenServiceMock } from 'auth/jwt/jwt.mock';
import { usersServiceMock } from 'auth/users/users.mock';

describe('Jwt auth service', () => {
  let strategy: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [tokenServiceMock, authJwtServiceProvider, usersServiceMock],
    }).compile();

    strategy = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });
});
