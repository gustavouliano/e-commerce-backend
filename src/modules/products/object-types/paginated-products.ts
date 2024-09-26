import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from '../entities/product';

@ObjectType()
export default class PaginatedProducts {
    @Field(() => [Product])
    data: Product[];

    @Field(() => Int)
    total: number;

    @Field(() => Int)
    page: number;

    @Field(() => Int)
    limit: number;
}
