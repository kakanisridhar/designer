import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { Roles } from '@nestjs-graphql-react/common';
import { Restrict, Strategy } from 'auth/auth.decorator';
import { UserEntity } from 'auth/users/users.entity';
import { UsersService } from 'auth/users/users.service';
import { UserArgs } from 'auth/users/dto/user.args';
import { UsersArgs } from 'auth/users/dto/users.args';
import { UserCreateInput } from 'auth/users/dto/user-create.input';
import { UserUpdateInput } from 'auth/users/dto/user-update.input';
import { RestrictTo } from 'auth/users/roles/roles.decorator';

@Restrict(Strategy.JWT)
@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  @RestrictTo(Roles.ADMIN)
  @Query(() => [UserEntity])
  getUsers(@Args() query?: UsersArgs) {
    return this.usersService.get(query);
  }

  @Query(() => UserEntity)
  getUser(@Args() query: UserArgs) {
    return this.usersService.getOne({ where: query });
  }

  @RestrictTo(Roles.ADMIN)
  @Mutation(() => Boolean)
  async removeUser(@Args('id') id: string) {
    const list = await this.usersService.delete(id);

    return list.affected > 0;
  }

  @RestrictTo(Roles.ADMIN)
  @Mutation(() => UserEntity)
  async createUser(@Args('data') data: UserCreateInput) {
    return this.usersService.create(data);
  }

  @RestrictTo(Roles.ADMIN)
  @Mutation(() => UserEntity)
  async updateUser(
    @Args('id') id: string,
    @Args('data') data: UserUpdateInput,
  ) {
    return this.usersService.update(id, data);
  }
}
