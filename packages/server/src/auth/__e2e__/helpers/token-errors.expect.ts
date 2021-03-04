import { Errors } from '@nestjs-graphql-react/common';
import { expectHasError } from '__e2e__/helpers/http-errors.expect';

export function expectMissingToken(errors: Error[]) {
  expectHasError(errors);
  expect(errors[0].message === Errors.ACCESS_TOKEN_MISSING);
}

export function expectExpiredToken(errors: Error[]) {
  expectHasError(errors);
  expect(errors[0].message === Errors.ACCESS_TOKEN_EXPIRED);
}
