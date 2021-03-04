import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { EmailScalar } from 'common/email/email.scalar';
import { ErrorFilter } from 'common/error/error.filter';

@Module({
  providers: [
    EmailScalar,
    ErrorFilter,
    { provide: APP_FILTER, useClass: ErrorFilter },
  ],
  exports: [EmailScalar, ErrorFilter],
})
export class CommonModule {}
