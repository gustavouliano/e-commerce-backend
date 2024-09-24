import { Args, Query, Resolver } from '@nestjs/graphql';
import { Public } from 'src/shared/services/auth/public.decorator';
import { Product } from './entities/product';
import { FindOneProductUseCase } from './use-cases/find-one-product.use-case';
import { FindProductUseCase } from './use-cases/find-product.use-case';

@Resolver(() => Product)
export class ProductsResolver {
    constructor(
        private readonly findOneProductUseCase: FindOneProductUseCase,
        private readonly findProductUseCase: FindProductUseCase,
    ) {}

    @Public()
    @Query(() => Product)
    async getProductById(@Args('id', { type: () => Number }) id: number) {
        console.log('b');
        return await this.findOneProductUseCase.execute(id);
    }

    @Public()
    @Query(() => [Product])
    async getProducts(@Args('categoryId', { nullable: true }) categoryId?: number) {
        return await this.findProductUseCase.execute();
    }
}
