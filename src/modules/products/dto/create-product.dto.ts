export class CreateProductDto {
    name: string;
    description: string;
    image?: string;
    price: number;
    quantity: number;
    productCategoryId: number;
}
