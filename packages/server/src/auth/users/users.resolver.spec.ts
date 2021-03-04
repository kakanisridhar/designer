import { Test, TestingModule } from '@nestjs/testing';

import { usersServiceMock } from 'auth/users/users.mock';
import { UsersResolver } from 'auth/users/users.resolver';

describe('UsersResolver', () => {
  let resolver: UsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersResolver, usersServiceMock],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
