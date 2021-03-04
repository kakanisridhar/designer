import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Entity, PrimaryColumn, Column, ManyToMany } from 'typeorm';

import { Roles } from '@nestjs-graphql-react/common';
import { UserEntity } from 'auth/users/users.entity';

@ObjectType()
@Entity('role')
export class RoleEntity {
  constructor(id?: Roles) {
    this.id = id;
  }

  @Field(() => ID)
  @PrimaryColumn('varchar', { enum: Roles, unique: true })
  public id?: Roles;

  @Field(() => String, { nullable: true })
  @Column('varchar', { length: '200', nullable: true })
  public description?: string;

  @Field(() => [UserEntity], { nullable: true })
  @ManyToMany(() => UserEntity)
  public users?: UserEntity[];
}
