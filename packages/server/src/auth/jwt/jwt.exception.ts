import { UnauthorizedException } from '@nestjs/common';

import { Errors } from '@nestjs-graphql-react/common';

export class MissingRefreshTokenException extends UnauthorizedException {
  message = Errors.ACCESS_TOKEN_MISSING;
}

export class ExpiredAccessTokenException extends UnauthorizedException {
  message = Errors.ACCESS_TOKEN_EXPIRED;
}
