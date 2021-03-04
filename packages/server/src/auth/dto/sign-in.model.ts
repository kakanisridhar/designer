import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SignInModel {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
}
