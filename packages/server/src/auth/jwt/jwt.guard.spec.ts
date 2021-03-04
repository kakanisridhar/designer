import { Test, TestingModule } from '@nestjs/testing';

import { JwtGuard } from 'auth/jwt/jwt.guard';

describe('Graphql guard', () => {
  let guard: JwtGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtGuard],
    }).compile();

    guard = module.get(JwtGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
