import { ArgsType, Field } from '@nestjs/graphql';
import { IsString, Matches } from 'class-validator';

import { passwordRegExp } from '@nestjs-graphql-react/common';

@ArgsType()
export class ResetPassArgs {
  @IsString()
  @Field(() => String)
  readonly password: string;

  @IsString()
  @Matches(passwordRegExp, {
    message: 'password too weak',
  })
  @Field(() => String)
  readonly newPassword: string;
}
