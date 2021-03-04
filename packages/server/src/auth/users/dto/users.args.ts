import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsUUID, IsEnum } from 'class-validator';

import { Roles } from '@nestjs-graphql-react/common';
import { PaginationArgs } from 'common/_utils';

@ArgsType()
export class UsersArgs extends PaginationArgs {
  @IsUUID()
  @IsOptional()
  @Field(() => ID, { nullable: true })
  readonly id?: string;

  @IsEmail()
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly email?: string;

  @IsEnum(Roles)
  @IsOptional()
  @Field(() => Roles, { nullable: true })
  roles?: Roles;
}
