import { Product } from '../entities/product';

export interface IProductRepository {
    create(product: Product): Promise<Product>;
    find(relations?: string[]): Promise<Product[]>;
    findById(id: number, relations?: string[]): Promise<Product | null>;
    update(id: number, product: Product): Promise<void>;
    delete(id: number): Promise<void>;
}
