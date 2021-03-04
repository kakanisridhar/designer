import { Test, TestingModule } from '@nestjs/testing';

import { roleRepositoryMock } from 'auth/users/users.mock';
import { RolesService } from 'auth/users/roles/roles.service';

describe('RolesService', () => {
  let service: RolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesService, roleRepositoryMock],
    }).compile();

    service = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
