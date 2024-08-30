import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoriesController } from './product-categories.controller';
import { ProductCategory } from './entities/product-category';
import { ProductCategoryTypeormRepository } from './repository/product-category-typeorm.repository';
import { CreateProductCategoryUseCase } from './use-cases/create-product-category.use-case';
import { FindProductCategoryUseCase } from './use-cases/find-product-category.use-case';
import { FindOneProductCategoryUseCase } from './use-cases/find-one-product-category.use-case';
import { UpdateProductCategoryUseCase } from './use-cases/update-product-category.use-case';
import { DeleteProductCategoryUseCase } from './use-cases/delete-product-category.use-case';

@Module({
    imports: [TypeOrmModule.forFeature([ProductCategory])],
    controllers: [ProductCategoriesController],
    providers: [
        CreateProductCategoryUseCase,
        FindProductCategoryUseCase,
        FindOneProductCategoryUseCase,
        UpdateProductCategoryUseCase,
        DeleteProductCategoryUseCase,
        ProductCategoryTypeormRepository,
        { provide: 'IProductCategoryRepository', useClass: ProductCategoryTypeormRepository },
    ],
})
export class ProductCategoriesModule {}
