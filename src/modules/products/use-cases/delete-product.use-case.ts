import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from '../repository/product.repository';
import { BucketStorage } from 'src/shared/interfaces/bucket-storage';

@Injectable()
export class DeleteProductUseCase {
    constructor(
        @Inject('IProductRepository') private readonly repository: IProductRepository,
        @Inject('BucketStorage') private readonly bucket: BucketStorage,
    ) {}

    async execute(id: number) {
        const product = await this.repository.findById(id);
        if (product && product.image) {
            await this.bucket.deleteObject(product.image);
        }
        return await this.repository.delete(id);
    }
}
