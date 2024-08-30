import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from '../repository/product.repository';

@Injectable()
export class DeleteProductUseCase {
    constructor(@Inject('IProductRepository') private readonly repository: IProductRepository) {}

    async execute(id: number) {
        return await this.repository.delete(id);
    }
}
