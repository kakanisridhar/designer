import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';

import { Roles } from '@nestjs-graphql-react/common';
import { RoleEntity } from 'auth/users/roles/roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  getOne(options: FindOneOptions<RoleEntity>) {
    return this.roleRepository.findOne(options);
  }

  count(options?: FindManyOptions<RoleEntity>) {
    return this.roleRepository.count(options);
  }

  create(role: Roles) {
    const roleEntity = new RoleEntity(role);

    return this.roleRepository.save(roleEntity);
  }
}
