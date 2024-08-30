import { UpdateProductCategoryDto } from '../dto/update-product-category.dto';
import { ProductCategory } from '../entities/product-category';

export interface IProductCategoryRepository {
    create(productCategory: ProductCategory): Promise<ProductCategory>;
    find(): Promise<ProductCategory[]>;
    findById(id: number): Promise<ProductCategory | null>;
    update(id: number, updateProductCategoryDto: UpdateProductCategoryDto): Promise<void>;
    delete(id: number): Promise<void>;
}
