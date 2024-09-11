import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from '../repository/product.repository';
import { BucketStorage } from 'src/shared/interfaces/bucket-storage';

@Injectable()
export class FindProductUseCase {
    constructor(
        @Inject('IProductRepository') private readonly repository: IProductRepository,
        @Inject('BucketStorage') private readonly bucket: BucketStorage,
    ) {}

    async execute() {
        const products = await this.repository.find(['productCategory']);
        for (const product of products) {
            if (product.image) {
                product.image = await this.bucket.getObjectUrl(product.image);
            }
        }
        return products;
    }
}
