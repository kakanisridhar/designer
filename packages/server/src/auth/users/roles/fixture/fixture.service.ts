import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { Roles } from '@nestjs-graphql-react/common';
import { RolesService } from '../roles.service';

@Injectable()
export class RolesFixture {
  constructor(
    private readonly roleService: RolesService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async exec() {
    this.logger.info('start running roles fixture');
    try {
      const rolesCount = await this.roleService.count();

      if (rolesCount === 0)
        await Promise.all(
          Object.keys(Roles).map(async (role) => {
            const newRole = await this.roleService.create(role as Roles);

            this.logger.info(`Role ${newRole.id} created !`);
          }),
        );
    } catch (err) {
      this.logger.error('Something fail while creating roles');
      this.logger.error(err.name);
      if (err.message) this.logger.error(err.message);
      if (err.stack) this.logger.error(err.stack);
    }
  }
}
