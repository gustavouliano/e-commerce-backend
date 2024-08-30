import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IProductCategoryRepository } from '../repository/product-category.repository';
import { UpdateProductCategoryDto } from '../dto/update-product-category.dto';

@Injectable()
export class UpdateProductCategoryUseCase {
    constructor(
        @Inject('IProductCategoryRepository')
        private readonly repository: IProductCategoryRepository,
    ) {}

    async execute(id: number, input: UpdateProductCategoryDto) {
        const productCategoryExists = await this.repository.findById(id);
        if (!productCategoryExists) {
            throw new NotFoundException(`Product category ${id} doesn't exists.`);
        }
        await this.repository.update(id, input);
        return await this.repository.findById(id);
    }
}
