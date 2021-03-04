import { Test, TestingModule } from '@nestjs/testing';

import { rolesFixtureMock, usersServiceMock } from 'auth/users/users.mock';
import { UsersFixture } from 'auth/users/fixture/fixture.service';
import { configMock, loggerMock } from 'common/_utils/mocks/nest';

describe('FixtureService', () => {
  let service: UsersFixture;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersFixture,
        usersServiceMock,
        rolesFixtureMock,
        configMock,
        loggerMock,
      ],
    }).compile();

    service = module.get(UsersFixture);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
