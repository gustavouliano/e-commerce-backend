import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from '../repository/product.repository';

@Injectable()
export class FindProductUseCase {
    constructor(@Inject('IProductRepository') private readonly repository: IProductRepository) {}

    async execute() {
        return await this.repository.find(['productCategory']);
    }
}
