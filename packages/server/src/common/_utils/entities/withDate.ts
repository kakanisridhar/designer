import { ObjectType, Field } from '@nestjs/graphql';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
export class WithDate {
  @CreateDateColumn()
  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @UpdateDateColumn()
  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}
