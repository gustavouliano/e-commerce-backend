import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from '../entities/product-category';
import { IProductCategoryRepository } from './product-category.repository';
import { Repository } from 'typeorm';
import { UpdateProductCategoryDto } from '../dto/update-product-category.dto';

export class ProductCategoryTypeormRepository implements IProductCategoryRepository {
    constructor(@InjectRepository(ProductCategory) private typeOrmRepo: Repository<ProductCategory>) {}

    async create(productCategory: ProductCategory): Promise<ProductCategory> {
        return await this.typeOrmRepo.save(productCategory);
    }

    async find(): Promise<ProductCategory[]> {
        return await this.typeOrmRepo.find();
    }

    async findById(id: number): Promise<ProductCategory | null> {
        return await this.typeOrmRepo.findOne({ where: { id } });
    }

    async update(id: number, updateProductCategoryDto: UpdateProductCategoryDto): Promise<void> {
        await this.typeOrmRepo.update(id, updateProductCategoryDto);
    }

    async delete(id: number): Promise<void> {
        await this.typeOrmRepo.delete(id);
    }
}
