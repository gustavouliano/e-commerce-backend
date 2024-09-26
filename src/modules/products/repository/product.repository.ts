import { Product } from '../entities/product';

export interface IProductRepository {
    create(product: Product): Promise<Product>;
    find(offset: number, limit: number, relations?: string[]): Promise<{ data: Product[]; total: number }>;
    findById(id: number, relations?: string[]): Promise<Product | null>;
    update(id: number, product: Product): Promise<void>;
    delete(id: number): Promise<void>;
}
