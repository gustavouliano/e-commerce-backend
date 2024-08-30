import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IProductCategoryRepository } from '../repository/product-category.repository';

@Injectable()
export class FindOneProductCategoryUseCase {
    constructor(
        @Inject('IProductCategoryRepository')
        private readonly repository: IProductCategoryRepository,
    ) {}

    async execute(id: number) {
        const productCategory = await this.repository.findById(id);
        if (!productCategory) {
            throw new NotFoundException(`Product category ${id} doesn't exists.`);
        }
        return productCategory;
    }
}
