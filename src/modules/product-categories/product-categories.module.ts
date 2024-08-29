import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoriesController } from './product-categories.controller';
import { ProductCategory } from './entities/product-category';
import { ProductCategoryTypeormRepository } from './repository/product-category-typeorm.repository';
import { CreateProductCategoryUseCase } from './use-cases/create-product-category.use-case';
import { FindProductCategoryUseCase } from './use-cases/find-product-category.use-case';

@Module({
    imports: [TypeOrmModule.forFeature([ProductCategory])],
    controllers: [ProductCategoriesController],
    providers: [
        CreateProductCategoryUseCase,
        ProductCategoryTypeormRepository,
        FindProductCategoryUseCase,
        { provide: 'IProductCategoryRepository', useClass: ProductCategoryTypeormRepository },
    ],
})
export class ProductCategoriesModule {}
