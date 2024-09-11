import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IProductRepository } from '../repository/product.repository';
import { BucketStorage } from 'src/shared/interfaces/bucket-storage';

@Injectable()
export class UploadProductImageUseCase {
    constructor(
        @Inject('IProductRepository') private readonly repository: IProductRepository,
        @Inject('BucketStorage') private readonly bucket: BucketStorage,
    ) {}

    async execute(id: number, file: Express.Multer.File) {
        const product = await this.repository.findById(id);
        if (!product) {
            throw new NotFoundException("Product doesn't exists.");
        }
        if (product.image) {
            await this.bucket.deleteObject(product.image);
        }
        const randomImageName = crypto.randomUUID();
        await this.bucket.pushObject(randomImageName, file.buffer, file.mimetype);
        product.image = randomImageName;
        await this.repository.update(id, product);
    }
}
