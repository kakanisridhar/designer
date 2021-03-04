import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Restrict, Strategy } from 'auth/auth.decorator';
import { AuthService } from 'auth/auth.service';
import { CurrentUser, ReqUser } from 'auth/current-user/current-user.decorator';
import { SignInArgs } from 'auth/dto/sign-in.args';
import { SignInModel } from 'auth/dto/sign-in.model';
import { SignUpArgs } from 'auth/dto/sign-up.args';
import { ResetPassArgs } from 'auth/dto/reset-pass.args';
import { WhoAmIModel } from 'auth/dto/who-am-i.model';

@Resolver('Auth')
export class AuthResolver {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Restrict(Strategy.JWT)
  @Query(() => WhoAmIModel)
  whoAmI(@CurrentUser() user: ReqUser) {
    return this.authService.whoAmI(user.id);
  }

  @Mutation(() => SignInModel)
  login(@Args() input: SignInArgs) {
    return this.authService.signIn(input);
  }

  @Mutation(() => Boolean)
  async signup(@Args() args: SignUpArgs) {
    return this.authService.signup(args);
  }

  @Restrict(Strategy.JWT)
  @Mutation(() => Boolean)
  async resetPassword(
    @Args() { newPassword, password }: ResetPassArgs,
    @CurrentUser() { id }: ReqUser,
  ) {
    return this.authService.resetPassword(id, password, newPassword);
  }
}
