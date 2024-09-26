import { Args, Query, Resolver } from '@nestjs/graphql';
import { Public } from 'src/shared/services/auth/public.decorator';
import { Product } from './entities/product';
import { FindOneProductUseCase } from './use-cases/find-one-product.use-case';
import { FindProductUseCase } from './use-cases/find-product.use-case';
import PaginatedProducts from './object-types/paginated-products';

@Resolver(() => Product)
export class ProductsResolver {
    constructor(
        private readonly findOneProductUseCase: FindOneProductUseCase,
        private readonly findProductUseCase: FindProductUseCase,
    ) {}

    @Public()
    @Query(() => Product)
    async getProductById(@Args('id', { type: () => Number }) id: number) {
        return await this.findOneProductUseCase.execute(id);
    }

    @Public()
    @Query(() => PaginatedProducts)
    async getProducts(
        @Args('page', { defaultValue: 1 }) page: number = 1,
        @Args('limit', { defaultValue: 10 }) limit: number = 10,
    ) {
        return await this.findProductUseCase.execute(page, limit);
    }
}
