import { Inject, Injectable } from '@nestjs/common';
import { IProductCategoryRepository } from '../repository/product-category.repository';

@Injectable()
export class FindProductCategoryUseCase {
    constructor(
        @Inject('IProductCategoryRepository')
        private readonly repository: IProductCategoryRepository,
    ) {}

    async execute() {
        return await this.repository.find();
    }
}
