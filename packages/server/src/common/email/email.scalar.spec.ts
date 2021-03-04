import { Test, TestingModule } from '@nestjs/testing';

import { EmailScalar } from 'common/email/email.scalar';

describe('Error Filter', () => {
  let filter: EmailScalar;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailScalar],
    }).compile();

    filter = module.get(EmailScalar);
  });

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });
});
