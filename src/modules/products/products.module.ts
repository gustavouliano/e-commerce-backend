import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/Product';
import { ProductCategory } from '../product-categories/entities/product-category';
import { ProductsController } from './products.controller';
import { CreateProductUseCase } from './use-cases/create-product.use-case';
import { FindProductUseCase } from './use-cases/find-product.use-case';
import { ProductTypeormRepository } from './repository/product-typeorm.repository';
import { ProductCategoryTypeormRepository } from '../product-categories/repository/product-category-typeorm.repository';
import { FindOneProductUseCase } from './use-cases/find-one-product.use-case';
import { UpdateProductUseCase } from './use-cases/update-product.use-case';
import { DeleteProductUseCase } from './use-cases/delete-product.use-case';

@Module({
    imports: [TypeOrmModule.forFeature([Product, ProductCategory])],
    controllers: [ProductsController],
    providers: [
        CreateProductUseCase,
        FindProductUseCase,
        FindOneProductUseCase,
        UpdateProductUseCase,
        DeleteProductUseCase,
        ProductTypeormRepository,
        ProductCategoryTypeormRepository,
        { provide: 'IProductRepository', useClass: ProductTypeormRepository },
        { provide: 'IProductCategoryRepository', useClass: ProductCategoryTypeormRepository },
    ],
})
export class ProductsModule {}
