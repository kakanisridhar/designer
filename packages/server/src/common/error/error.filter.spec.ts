import { Test, TestingModule } from '@nestjs/testing';

import { loggerMock } from 'common/_utils/mocks/nest';
import { ErrorFilter } from 'common/error/error.filter';

describe('Error Filter', () => {
  let filter: ErrorFilter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ErrorFilter, loggerMock],
    }).compile();

    filter = module.get<ErrorFilter>(ErrorFilter);
  });

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });
});
