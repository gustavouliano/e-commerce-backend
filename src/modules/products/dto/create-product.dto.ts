import { IsInt, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @MaxLength(45)
    name: string;

    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    image?: string;

    @IsNumber()
    price: number;

    @IsInt()
    quantity: number;

    @IsInt()
    productCategoryId: number;
}
