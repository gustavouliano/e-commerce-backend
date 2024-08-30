import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IProductRepository } from '../repository/product.repository';
import { Product } from '../entities/Product';
import { CreateProductDto } from '../dto/create-product.dto';
import { IProductCategoryRepository } from 'src/modules/product-categories/repository/product-category.repository';

@Injectable()
export class CreateProductUseCase {
    constructor(
        @Inject('IProductRepository') private readonly repository: IProductRepository,
        @Inject('IProductCategoryRepository') private readonly productCategoryRepository: IProductCategoryRepository,
    ) {}

    /**
     * TODO: Verifiy if two repositories is the best way
     */
    async execute(createProductDto: CreateProductDto) {
        const productCategory = await this.productCategoryRepository.findById(createProductDto.productCategoryId);
        if (!productCategory) {
            throw new NotFoundException(`Product category ${createProductDto.productCategoryId} doesn't exists.`);
        }
        const product = new Product();
        Object.assign(product, createProductDto);
        product.productCategory = productCategory;
        return await this.repository.create(product);
    }
}
