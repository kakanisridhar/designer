import { getRepositoryToken } from '@nestjs/typeorm';
import { createMock } from 'ts-auto-mock';
import { Repository } from 'typeorm';

import { UserEntity } from 'auth/users/users.entity';
import { UsersService } from 'auth/users/users.service';
import { UsersFixture } from 'auth/users/fixture/fixture.service';
import { RolesFixture } from 'auth/users/roles/fixture/fixture.service';
import { RoleEntity } from 'auth/users/roles/roles.entity';
import { RolesService } from 'auth/users/roles/roles.service';

export const usersServiceMock = {
  provide: UsersService,
  useValue: createMock<UsersService>(),
};

export const rolesServiceMock = {
  provide: RolesService,
  useValue: createMock<RolesService>(),
};

export const userRepositoryMock = {
  provide: getRepositoryToken(UserEntity),
  useValue: createMock<Repository<UserEntity>>(),
};

export const roleRepositoryMock = {
  provide: getRepositoryToken(RoleEntity),
  useValue: createMock<Repository<RoleEntity>>(),
};

export const rolesFixtureMock = {
  provide: RolesFixture,
  useValue: createMock<RolesFixture>(),
};

export const usersFixtureMock = {
  provide: UsersFixture,
  useValue: createMock<UsersFixture>(),
};
