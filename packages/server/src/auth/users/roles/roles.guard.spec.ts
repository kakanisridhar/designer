import { Test, TestingModule } from '@nestjs/testing';

import { LocalRolesGuard } from 'auth/users/roles/roles.guard';
import { usersServiceMock } from 'auth/users/users.mock';

describe('LocalRoles guard', () => {
  let guard: LocalRolesGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalRolesGuard, usersServiceMock],
    }).compile();

    guard = module.get(LocalRolesGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
