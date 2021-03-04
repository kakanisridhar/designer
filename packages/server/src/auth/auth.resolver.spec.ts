import { Test, TestingModule } from '@nestjs/testing';

import { AuthResolver } from 'auth/auth.resolver';
import { authServiceMock } from 'auth/auth.mock';

describe('AuthResolver', () => {
  let resolver: AuthResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthResolver, authServiceMock],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
