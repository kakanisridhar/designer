import { SignInArgs } from 'auth/dto/sign-in.args';
import { SignInModel } from 'auth/dto/sign-in.model';
import { SignUpArgs } from 'auth/dto/sign-up.args';
import { WhoAmIModel } from 'auth/dto/who-am-i.model';

export abstract class AuthService {
  abstract signIn(user: SignInArgs): Promise<SignInModel>;
  abstract whoAmI(id: string): Promise<WhoAmIModel>;
  abstract signup?(data: SignUpArgs): Promise<boolean>;
  abstract resetPassword?(
    id: string,
    password: string,
    newPassword: string,
  ): Promise<boolean>;
}
