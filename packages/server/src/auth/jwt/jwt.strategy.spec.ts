import { Test, TestingModule } from '@nestjs/testing';

import { JwtStrategy } from 'auth/jwt/jwt.strategy';
import { configMock } from 'common/_utils/mocks/nest';

describe('Jwt strategy', () => {
  let strategy: JwtStrategy;

  beforeEach(async () => {
    configMock.useValue.get = () => 'secret';
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtStrategy, configMock],
    }).compile();

    strategy = module.get(JwtStrategy);
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });
});
