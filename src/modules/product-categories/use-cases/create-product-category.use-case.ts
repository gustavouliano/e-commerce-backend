import { Inject, Injectable } from '@nestjs/common';
import { IProductCategoryRepository } from '../repository/product-category.repository';
import { CreateProductCategoryDto } from '../dto/create-product-category.dto';
import { ProductCategory } from '../entities/product-category';

@Injectable()
export class CreateProductCategoryUseCase {
    constructor(
        @Inject('IProductCategoryRepository')
        private readonly repository: IProductCategoryRepository,
    ) {}

    async execute(input: CreateProductCategoryDto) {
        const productCategory = new ProductCategory(input);
        return await this.repository.create(productCategory);
    }
}
