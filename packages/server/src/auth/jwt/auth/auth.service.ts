import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserEntity } from 'auth/users/users.entity';
import { UsersService } from 'auth/users/users.service';
import { SignInModel } from 'auth/dto/sign-in.model';
import { TokenService } from 'auth/jwt/token/token.service';
import { AuthService } from 'auth/auth.service';
import { SignUpArgs } from 'auth/dto/sign-up.args';

type SimpleUser = Pick<UserEntity, 'email' | 'id' | 'count' | 'roles'>;

@Injectable()
class JwtAuthService implements AuthService {
  constructor(
    private readonly token: TokenService,
    private readonly usersService: UsersService,
  ) {}

  private async validateLocalUser(
    email: string,
    pass: string,
  ): Promise<SimpleUser> {
    const user = await this.usersService.getOne({
      where: { email },
      select: ['id', 'count', 'password'],
      relations: ['roleEntities'],
    });

    if (user && (await user.authenticate(pass))) {
      return user;
    }

    return null;
  }

  async signIn(user: Partial<UserEntity>): Promise<SignInModel> {
    const validUser = await this.validateLocalUser(user.email, user.password);

    if (!validUser) {
      throw new UnauthorizedException();
    }

    return this.token.generate(validUser);
  }

  async whoAmI(id: string) {
    return this.usersService.getOne({
      where: { id },
      relations: ['roleEntities'],
    });
  }

  async resetPassword(id: string, password: string, newPassword: string) {
    const user = await this.usersService.getOne({ where: { id } });

    if (!(await user.authenticate(password))) throw new UnauthorizedException();

    const { affected } = await this.usersService.update(id, {
      password: newPassword,
      count: user.count + 1,
    });

    return affected > 0;
  }

  async signup(data: SignUpArgs) {
    const { id } = await this.usersService.create(data);

    return !!id;
  }
}

export const authJwtServiceProvider = {
  provide: AuthService,
  useClass: JwtAuthService,
};
