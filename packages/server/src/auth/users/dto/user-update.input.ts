import { InputType, Field, HideField } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

import { UserCreateInput } from './user-create.input';

@InputType()
export class UserUpdateInput extends UserCreateInput {
  @IsOptional()
  @Field(() => String)
  readonly email: string;

  @IsOptional()
  @Field(() => String)
  readonly password: string;

  @IsOptional()
  @HideField()
  readonly newPassword: string;

  @IsOptional()
  @HideField()
  readonly count?: number;
}
