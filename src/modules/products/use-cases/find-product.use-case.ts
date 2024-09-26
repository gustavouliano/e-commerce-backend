import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from '../repository/product.repository';
import { BucketStorage } from 'src/shared/interfaces/bucket-storage';

@Injectable()
export class FindProductUseCase {
    constructor(
        @Inject('IProductRepository') private readonly repository: IProductRepository,
        @Inject('BucketStorage') private readonly bucket: BucketStorage,
    ) {}

    async execute(page: number = 1, limit: number = 10) {
        const offset = page > 0 ? (page - 1) * limit : 0;
        const { data, total } = await this.repository.find(offset, limit, ['productCategory']);
        for (const product of data) {
            if (product.image) {
                product.image = await this.bucket.getObjectUrl(product.image);
            }
        }
        return { data, total, page, limit };
    }
}
