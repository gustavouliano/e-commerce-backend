import { ProductCategory } from '../entities/product-category';

export interface IProductCategoryRepository {
    create(productCategory: ProductCategory): Promise<ProductCategory>;
    find(): Promise<ProductCategory[]>;
}
