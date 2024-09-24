import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { ProductCategory } from 'src/modules/product-categories/entities/product-category';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType({ description: 'products' })
@Entity()
export class Product {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column({ type: 'text' })
    description: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    image?: string;

    @Field(() => Float)
    @Field()
    @Column({ type: 'float' })
    price: number;

    @Field(() => Int)
    @Column({ type: 'int' })
    quantity: number;

    // @Field(() => ProductCategory)
    @ManyToOne(() => ProductCategory, (productCategory) => productCategory.products)
    productCategory: ProductCategory;
}
