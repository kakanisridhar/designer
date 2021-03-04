import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@ArgsType()
export class SignInArgs {
  @IsEmail()
  @Field(() => String)
  readonly email: string;

  @IsString()
  @Field(() => String)
  readonly password: string;
}
