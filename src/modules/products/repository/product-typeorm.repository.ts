import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product';
import { IProductRepository } from './product.repository';
import { Repository } from 'typeorm';

export class ProductTypeormRepository implements IProductRepository {
    constructor(@InjectRepository(Product) private typeOrmRepo: Repository<Product>) {}

    async create(product: Product): Promise<Product> {
        return await this.typeOrmRepo.save(product);
    }
    async find(offset: number, limit: number, relations?: string[]): Promise<{ data: Product[]; total: number }> {
        const [data, total] = await this.typeOrmRepo.findAndCount({
            skip: offset,
            take: limit,
            loadRelationIds: { relations },
        });
        return { data, total };
    }
    async findById(id: number, relations?: string[]): Promise<Product | null> {
        return await this.typeOrmRepo.findOne({ where: { id }, relations });
    }
    async update(id: number, product: Product): Promise<void> {
        await this.typeOrmRepo.update(id, product);
    }
    async delete(id: number): Promise<void> {
        await this.typeOrmRepo.delete(id);
    }
}
