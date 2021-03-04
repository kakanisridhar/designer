import { Test, TestingModule } from '@nestjs/testing';

import { configMock, jwtMock } from 'common/_utils/mocks/nest';
import { TokenService } from 'auth/jwt/token/token.service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenService, configMock, jwtMock],
    }).compile();

    service = module.get<TokenService>(TokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
