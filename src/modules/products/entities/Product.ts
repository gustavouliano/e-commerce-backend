import { ProductCategory } from 'src/modules/product-categories/entities/product-category';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ nullable: true })
    image?: string;

    @Column({ type: 'float' })
    price: number;

    @Column({ type: 'int' })
    quantity: number;

    @ManyToOne(() => ProductCategory, (productCategory) => productCategory.products)
    productCategory: ProductCategory;
}
