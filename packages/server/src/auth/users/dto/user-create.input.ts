import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  IsOptional,
  IsArray,
} from 'class-validator';

import { passwordRegExp, Roles } from '@nestjs-graphql-react/common';
import { EmailScalar as Email } from 'common/email/email.scalar';

@InputType()
export class UserCreateInput {
  @IsEmail()
  @Field(() => Email)
  readonly email: string;

  @IsString()
  @MaxLength(200)
  @Matches(passwordRegExp, {
    message: 'password too weak',
  })
  @Field(() => String)
  readonly password: string;

  @IsOptional()
  @IsArray()
  @Field(() => [Roles], { nullable: true })
  readonly roles?: Roles[];
}
