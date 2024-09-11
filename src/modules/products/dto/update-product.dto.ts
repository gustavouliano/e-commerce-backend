import { IsInt, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProductDto {
    @IsString()
    @MaxLength(45)
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    @IsOptional()
    price: number;

    @IsInt()
    @IsOptional()
    quantity: number;

    @IsInt()
    @IsOptional()
    productCategoryId: number;
}
