import { Injectable } from '@nestjs/common';
import faker from 'faker';

import { Roles } from '@nestjs-graphql-react/common';
import { UserCreateInput } from 'auth/users/dto/user-create.input';
import { UsersFixture } from 'auth/users/fixture/fixture.service';

@Injectable()
export class UsersFakerFixture extends UsersFixture {
  private generateUser(role: Roles) {
    return {
      email: faker.internet.email(),
      password: faker.internet.password(),
      count: 0,
      roles: [role],
    };
  }

  async createUser(user?: UserCreateInput | null, role = Roles.NORMAL) {
    await this.usersService.create(user || this.generateUser(role));
  }

  async createManyUser(amount: number, role = Roles.NORMAL) {
    return Promise.all(
      Array.from(Array(amount).keys()).map(() => this.createUser(null, role)),
    );
  }
}
