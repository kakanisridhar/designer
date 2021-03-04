import { SetMetadata } from '@nestjs/common';

import { Roles } from '@nestjs-graphql-react/common';

export const restrictToMetaKey = Symbol('roles');

export const RestrictTo = (...roles: Roles[]) =>
  SetMetadata(restrictToMetaKey, roles);
