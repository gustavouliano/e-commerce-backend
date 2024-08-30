import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IProductRepository } from '../repository/product.repository';

@Injectable()
export class FindOneProductUseCase {
    constructor(@Inject('IProductRepository') private readonly repository: IProductRepository) {}

    async execute(id: number) {
        const product = await this.repository.findById(id, ['productCategory']);
        if (!product) {
            throw new NotFoundException(`Product ${id} doesn't exists.`);
        }
        return product;
    }
}
