import { Field, HideField, ID, ObjectType, Int } from '@nestjs/graphql';
import { compare, hash } from 'bcrypt';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  AfterLoad,
} from 'typeorm';

import { Roles } from '@nestjs-graphql-react/common';
import { RoleEntity } from 'auth/users/roles/roles.entity';
import { UserCreateInput } from 'auth/users/dto/user-create.input';
import { WithDate } from 'common/_utils';
import { EmailScalar as Email } from 'common/email/email.scalar';

const SALT = 10;

@ObjectType()
@Entity('user')
export class UserEntity extends WithDate {
  constructor(data?: Partial<UserCreateInput>) {
    super();

    if (data) {
      if (data.email) this.email = data.email;
      if (data.password) this.password = data.password;
      if (data.roles) this.roleEntities = data.roles.map((id) => ({ id }));
    }
  }

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id?: string;

  @Field(() => Email, { nullable: true })
  @Column('varchar', { length: 50, unique: true })
  email?: string;

  @HideField()
  @Column('varchar', { length: 200 })
  password?: string;

  @Field(() => Int, { nullable: true })
  @Column('integer', { default: 0 })
  count?: number;

  @HideField()
  @ManyToMany(() => RoleEntity)
  @JoinTable()
  roleEntities: RoleEntity[];

  @Field(() => [Roles])
  roles: Roles[];

  private mapRolesEntities() {
    this.roleEntities = this.roles.map((id) => ({ id }));
    delete this.roles;
  }

  private mapRoles() {
    this.roles = this.roleEntities.map(({ id }) => id);
    delete this.roleEntities;
  }

  private async hashPassword() {
    this.password = await hash(this.password, SALT);
  }

  @BeforeInsert()
  async beforeInsert() {
    if (this.roles) this.mapRolesEntities();
    else this.roleEntities = [{ id: Roles.NORMAL }];

    await this.hashPassword();
  }

  @BeforeUpdate()
  async beforeUpdate() {
    if (this.roles) this.mapRolesEntities();
    if (this.password) await this.hashPassword();
  }

  @AfterLoad()
  formatRoles() {
    if (this.roleEntities?.length > 0) this.mapRoles();
  }

  authenticate(pass: string) {
    return compare(pass, this.password);
  }
}
