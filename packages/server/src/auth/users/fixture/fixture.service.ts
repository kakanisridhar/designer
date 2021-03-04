import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { Roles } from '@nestjs-graphql-react/common';
import { UsersService } from 'auth/users/users.service';
import { RolesFixture } from 'auth/users/roles/fixture/fixture.service';
import { IFixture, Env } from 'common/_utils';

@Injectable()
export class UsersFixture implements IFixture {
  constructor(
    protected readonly usersService: UsersService,
    protected readonly rolesFixture: RolesFixture,
    protected readonly config: ConfigService,
    @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger,
  ) {}

  async exec() {
    try {
      await this.rolesFixture.exec();

      this.logger.info('start running users fixture');

      const adminCount = await this.usersService.countByRole(Roles.ADMIN);

      if (adminCount === 0) {
        await this.usersService.create({
          email: this.config.get(Env.ADMIN_EMAIL),
          password: this.config.get(Env.ADMIN_PASS),
          roles: [Roles.ADMIN],
        });

        this.logger.info('admin user created');
      }
    } catch (err) {
      this.logger.error('something fail while creating admin user');
      this.logger.error(err.name);
      if (err.message) this.logger.error(err.messagwe);
      if (err.stack) this.logger.error(err.stack);
    }
  }
}
