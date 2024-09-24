import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product';
import { ProductCategory } from '../product-categories/entities/product-category';
import { ProductsController } from './products.controller';
import { CreateProductUseCase } from './use-cases/create-product.use-case';
import { FindProductUseCase } from './use-cases/find-product.use-case';
import { ProductTypeormRepository } from './repository/product-typeorm.repository';
import { ProductCategoryTypeormRepository } from '../product-categories/repository/product-category-typeorm.repository';
import { FindOneProductUseCase } from './use-cases/find-one-product.use-case';
import { UpdateProductUseCase } from './use-cases/update-product.use-case';
import { DeleteProductUseCase } from './use-cases/delete-product.use-case';
import { UploadProductImageUseCase } from './use-cases/upload-product-image.use-case';
import { S3BucketStorageAws } from 'src/shared/services/fileStorage/s3-bucket-storage-aws';
import { ProductsResolver } from './products.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([Product, ProductCategory])],
    controllers: [ProductsController],
    providers: [
        CreateProductUseCase,
        FindProductUseCase,
        FindOneProductUseCase,
        UpdateProductUseCase,
        UploadProductImageUseCase,
        DeleteProductUseCase,
        ProductTypeormRepository,
        ProductCategoryTypeormRepository,
        { provide: 'BucketStorage', useClass: S3BucketStorageAws },
        { provide: 'IProductRepository', useClass: ProductTypeormRepository },
        { provide: 'IProductCategoryRepository', useClass: ProductCategoryTypeormRepository },
        ProductsResolver,
    ],
})
export class ProductsModule {}
