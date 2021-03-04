import { Test, TestingModule } from '@nestjs/testing';

import { rolesServiceMock } from 'auth/users/users.mock';
import { RolesFixture } from 'auth/users/roles/fixture/fixture.service';
import { loggerMock } from 'common/_utils/mocks/nest';

describe('Roles fixture', () => {
  let service: RolesFixture;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesFixture, rolesServiceMock, loggerMock],
    }).compile();

    service = module.get(RolesFixture);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
