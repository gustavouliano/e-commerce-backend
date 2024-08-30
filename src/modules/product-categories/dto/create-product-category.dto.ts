import { IsString, MaxLength } from 'class-validator';

export class CreateProductCategoryDto {
    @IsString()
    @MaxLength(45)
    name: string;

    @IsString()
    description: string;
}
