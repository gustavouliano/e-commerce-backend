import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './modules/product-categories/entities/product-category';
import { ProductCategoriesModule } from './modules/product-categories/product-categories.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5433,
            username: 'postgres',
            password: 'postgres',
            database: 'ecommerce',
            entities: [ProductCategory],
            synchronize: true,
        }),
        ProductCategoriesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
