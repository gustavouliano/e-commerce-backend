import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from '../dto/update-product.dto';
import { IProductRepository } from '../repository/product.repository';
import { IProductCategoryRepository } from 'src/modules/product-categories/repository/product-category.repository';
import { Product } from '../entities/product';

@Injectable()
export class UpdateProductUseCase {
    constructor(
        @Inject('IProductRepository') private readonly repository: IProductRepository,
        @Inject('IProductCategoryRepository') private readonly productCategoryRepository: IProductCategoryRepository,
    ) {}

    /**
     * TODO: Verifiy if two repositories is the best way
     */
    async execute(id: number, input: UpdateProductDto) {
        const productExists = await this.repository.findById(id, ['productCategory']);
        if (!productExists) {
            throw new NotFoundException(`Product ${id} doesn't exists.`);
        }
        const product = new Product();
        product.name = input.name;
        product.description = input.description;
        product.price = input.price;
        product.quantity = input.quantity;

        if (input.productCategoryId && input.productCategoryId != productExists.productCategory.id) {
            const productCategory = await this.getCategory(input.productCategoryId);
            product.productCategory = productCategory;
        }
        await this.repository.update(id, product);
        return await this.repository.findById(id);
    }

    private async getCategory(productCategoryId: number) {
        const productCategory = await this.productCategoryRepository.findById(productCategoryId);
        if (!productCategory) {
            throw new NotFoundException(`Product category ${productCategoryId} doesn't exists.`);
        }
        return productCategory;
    }
}
