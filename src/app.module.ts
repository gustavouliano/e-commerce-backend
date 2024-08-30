import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './modules/product-categories/entities/product-category';
import { ProductCategoriesModule } from './modules/product-categories/product-categories.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT, 10),
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASS,
            database: process.env.DATABASE_NAME,
            entities: [ProductCategory],
            synchronize: true,
        }),
        ProductCategoriesModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
