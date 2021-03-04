import { ObjectType } from '@nestjs/graphql';

import { UserEntity } from 'auth/users/users.entity';

@ObjectType()
export class WhoAmIModel extends UserEntity {}
