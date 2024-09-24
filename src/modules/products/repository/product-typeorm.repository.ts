import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product';
import { IProductRepository } from './product.repository';
import { Repository } from 'typeorm';

export class ProductTypeormRepository implements IProductRepository {
    constructor(@InjectRepository(Product) private typeOrmRepo: Repository<Product>) {}

    async create(product: Product): Promise<Product> {
        return await this.typeOrmRepo.save(product);
    }
    async find(relations?: string[]): Promise<Product[]> {
        return await this.typeOrmRepo.find({ loadRelationIds: { relations } });
    }
    async findById(id: number, relations?: string[]): Promise<Product | null> {
        // return await this.typeOrmRepo.findOne({ where: { id }, loadRelationIds: { relations: ['productCategory'] } });
        return await this.typeOrmRepo.findOne({ where: { id }, relations });
    }
    async update(id: number, product: Product): Promise<void> {
        await this.typeOrmRepo.update(id, product);
    }
    async delete(id: number): Promise<void> {
        await this.typeOrmRepo.delete(id);
    }
}
