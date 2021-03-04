import { Test, TestingModule } from '@nestjs/testing';

import { JwtFilter } from 'auth/jwt/jwt.filter';
import { usersServiceMock } from 'auth/users/users.mock';
import { configMock, httpMock, jwtMock } from 'common/_utils/mocks/nest';
import { tokenServiceMock } from 'auth/jwt/jwt.mock';

describe('Auth Filter', () => {
  let filter: JwtFilter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtFilter,
        usersServiceMock,
        jwtMock,
        configMock,
        httpMock,
        tokenServiceMock,
      ],
    }).compile();

    filter = module.get(JwtFilter);
  });

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });
});
