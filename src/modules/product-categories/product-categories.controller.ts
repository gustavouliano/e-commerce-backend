import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CreateProductCategoryUseCase } from './use-cases/create-product-category.use-case';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { FindProductCategoryUseCase } from './use-cases/find-product-category.use-case';

@Controller('product-categories')
export class ProductCategoriesController {
    constructor(
        @Inject() private createProductCategoryUseCase: CreateProductCategoryUseCase,
        @Inject() private findProductCategoryUseCase: FindProductCategoryUseCase,
    ) {}

    @Post()
    create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
        return this.createProductCategoryUseCase.execute(createProductCategoryDto);
    }

    @Get()
    find() {
        return this.findProductCategoryUseCase.execute();
    }
}
