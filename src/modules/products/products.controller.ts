import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Inject,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductUseCase } from './use-cases/create-product.use-case';
import { FindProductUseCase } from './use-cases/find-product.use-case';
import { FindOneProductUseCase } from './use-cases/find-one-product.use-case';
import { UpdateProductUseCase } from './use-cases/update-product.use-case';
import { DeleteProductUseCase } from './use-cases/delete-product.use-case';
import { UpdateProductDto } from './dto/update-product.dto';
import { Public } from 'src/shared/services/auth/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadProductImageUseCase } from './use-cases/upload-product-image.use-case';

@Controller('products')
export class ProductsController {
    constructor(
        @Inject() private createProductUseCase: CreateProductUseCase,
        @Inject() private findProductUseCase: FindProductUseCase,
        @Inject() private findOneProductUseCase: FindOneProductUseCase,
        @Inject() private updateProductUseCase: UpdateProductUseCase,
        @Inject() private deleteProductUseCase: DeleteProductUseCase,
        @Inject() private uploadProductImageUseCase: UploadProductImageUseCase,
    ) {}

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.createProductUseCase.execute(createProductDto);
    }

    @Post(':id/upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(@Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File) {
        return this.uploadProductImageUseCase.execute(id, file);
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
