import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Patch, Post } from '@nestjs/common';
import { CreateProductCategoryUseCase } from './use-cases/create-product-category.use-case';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { FindProductCategoryUseCase } from './use-cases/find-product-category.use-case';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { UpdateProductCategoryUseCase } from './use-cases/update-product-category.use-case';
import { FindOneProductCategoryUseCase } from './use-cases/find-one-product-category.use-case';
import { DeleteProductCategoryUseCase } from './use-cases/delete-product-category.use-case';

@Controller('product-categories')
export class ProductCategoriesController {
    constructor(
        @Inject() private createProductCategoryUseCase: CreateProductCategoryUseCase,
        @Inject() private findProductCategoryUseCase: FindProductCategoryUseCase,
        @Inject() private findOneProductCategoryUseCase: FindOneProductCategoryUseCase,
        @Inject() private updateProductCategoryUseCase: UpdateProductCategoryUseCase,
        @Inject() private deleteProductCategoryUseCase: DeleteProductCategoryUseCase,
    ) {}

    @Post()
    create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
        return this.createProductCategoryUseCase.execute(createProductCategoryDto);
    }

    @Get()
    find() {
        return this.findProductCategoryUseCase.execute();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.findOneProductCategoryUseCase.execute(id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateProductCategoryDto: UpdateProductCategoryDto) {
        return this.updateProductCategoryUseCase.execute(id, updateProductCategoryDto);
    }

    @HttpCode(204)
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.deleteProductCategoryUseCase.execute(id);
    }
}
