import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MaxLength, Matches } from 'class-validator';

import { passwordRegExp } from '@nestjs-graphql-react/common';
import { EmailScalar as Email } from 'common/email/email.scalar';

@ArgsType()
export class SignUpArgs {
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
}
