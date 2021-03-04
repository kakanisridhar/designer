import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsUUID } from 'class-validator';

@ArgsType()
export class UserArgs {
  @IsUUID()
  @IsOptional()
  @Field(() => ID, { nullable: true })
  readonly id?: string;

  @IsEmail()
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly email?: string;
}
