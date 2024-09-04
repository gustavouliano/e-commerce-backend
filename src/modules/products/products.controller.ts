import { Body, Controller, Delete, Get, HttpCode, Inject, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductUseCase } from './use-cases/create-product.use-case';
import { FindProductUseCase } from './use-cases/find-product.use-case';
import { FindOneProductUseCase } from './use-cases/find-one-product.use-case';
import { UpdateProductUseCase } from './use-cases/update-product.use-case';
import { DeleteProductUseCase } from './use-cases/delete-product.use-case';
import { UpdateProductDto } from './dto/update-product.dto';
import { Public } from 'src/shared/services/auth/public.decorator';

@Controller('products')
export class ProductsController {
    constructor(
        @Inject() private createProductUseCase: CreateProductUseCase,
        @Inject() private findProductUseCase: FindProductUseCase,
        @Inject() private findOneProductUseCase: FindOneProductUseCase,
        @Inject() private updateProductUseCase: UpdateProductUseCase,
        @Inject() private deleteProductUseCase: DeleteProductUseCase,
    ) {}

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.createProductUseCase.execute(createProductDto);
    }

    @Public()
    @Get()
    find() {
        return this.findProductUseCase.execute();
    }

    @Public()
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.findOneProductUseCase.execute(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
        return this.updateProductUseCase.execute(id, updateProductDto);
    }

    @Delete(':id')
    @HttpCode(204)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.deleteProductUseCase.execute(id);
    }
}
