import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './modules/product-categories/entities/product-category';
import { ProductCategoriesModule } from './modules/product-categories/product-categories.module';
import { ConfigModule } from '@nestjs/config';
import { Product } from './modules/products/entities/Product';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/entities/User';

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
            entities: [ProductCategory, Product, User],
            synchronize: true,
        }),
        ProductCategoriesModule,
        ProductsModule,
        UsersModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
