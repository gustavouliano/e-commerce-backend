import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from '../entities/product-category';
import { IProductCategoryRepository } from './product-category.repository';
import { Repository } from 'typeorm';

export class ProductCategoryTypeormRepository implements IProductCategoryRepository {
    constructor(
        @InjectRepository(ProductCategory) private typeOrmRepo: Repository<ProductCategory>,
    ) {}

    async create(productCategory: ProductCategory): Promise<ProductCategory> {
        return await this.typeOrmRepo.save(productCategory);
    }

    async find(): Promise<ProductCategory[]> {
        return await this.typeOrmRepo.find();
    }
}
