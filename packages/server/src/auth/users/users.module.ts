import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule } from 'common/common.module';
import { UserEntity } from 'auth/users/users.entity';
import { UsersResolver } from 'auth/users/users.resolver';
import { UsersService } from 'auth/users/users.service';
import { UsersFixture } from 'auth/users/fixture/fixture.service';
import { UsersFakerFixture } from 'auth/users/fixture/fixture.service.faker';
import { RoleEntity } from 'auth/users/roles/roles.entity';
import { RolesFixture } from 'auth/users/roles/fixture/fixture.service';
import { LocalRolesGuard } from 'auth/users/roles/roles.guard';
import { RolesService } from 'auth/users/roles/roles.service';
import { Env } from 'common/_utils';
import { RolesGuard } from 'common/roles/roles.guard';
import { NodeEnv } from '@nestjs-graphql-react/common';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
    ConfigModule,
  ],
  providers: [
    {
      provide: UsersFixture,
      useClass:
        process.env.NODE_ENV === NodeEnv.TEST
          ? UsersFakerFixture
          : UsersFixture,
    },
    UsersResolver,
    UsersService,
    { provide: RolesGuard, useClass: LocalRolesGuard },
    RolesService,
    RolesFixture,
  ],
  exports: [UsersService],
})
export class UsersModule implements OnModuleInit {
  constructor(
    private readonly usersFixture: UsersFixture,
    private readonly config: ConfigService,
  ) {}

  async onModuleInit() {
    if (this.config.get(Env.NODE_ENV) !== NodeEnv.TEST) {
      await this.usersFixture.exec();
    }
  }
}
