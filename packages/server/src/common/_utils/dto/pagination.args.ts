import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Order } from 'common/_utils/helpers/enums';

@ArgsType()
export abstract class PaginationArgs {
  @Field(() => Int, { nullable: true })
  readonly skip?: number;

  @Field(() => Int, { nullable: true })
  readonly take?: number;

  @Field(() => Order, { nullable: true })
  readonly order?: Order;

  @Field(() => String, { nullable: true })
  readonly sortBy?: string;
}
