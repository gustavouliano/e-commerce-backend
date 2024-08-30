import { Inject, Injectable } from '@nestjs/common';
import { IProductCategoryRepository } from '../repository/product-category.repository';

@Injectable()
export class DeleteProductCategoryUseCase {
    constructor(
        @Inject('IProductCategoryRepository')
        private readonly repository: IProductCategoryRepository,
    ) {}

    async execute(id: number) {
        await this.repository.delete(id);
    }
}
