import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user';
import { AuthController } from './auth.controller';
import { LoginUseCase } from './use-cases/login.use-case';
import { RegisterUseCase } from './use-cases/register.use-case';
import { ValidateUserUseCase } from './use-cases/validate-user.use-case';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UserTypeormRepository } from '../users/repository/user-typeorm.repository';
import { CryptographyBcrypt } from 'src/shared/services/crypt/cryptography-bcrypt';
import { CreateUserUseCase } from '../users/use-cases/create-user.use-case';
import { RefreshUseCase } from './use-cases/refresh.use-case';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';
import { VerifyUserUseCase } from './use-cases/verify-user.use-case';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async () => ({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: '1h',
                },
            }),
        }),
        ClientsModule.register([
            {
                name: 'product_producer_client',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'client_product_producer',
                        brokers: ['localhost:29092'],
                    },
                    consumer: {
                        groupId: 'group_client_product_producer',
                    },
                    producer: {
                        createPartitioner: Partitioners.LegacyPartitioner,
                    },
                },
            },
        ]),
    ],
    controllers: [AuthController],
    providers: [
        LoginUseCase,
        RegisterUseCase,
        RefreshUseCase,
        VerifyUserUseCase,
        ValidateUserUseCase,
        LocalStrategy,
        JwtStrategy,
        CreateUserUseCase,
        { provide: 'IUserRepository', useClass: UserTypeormRepository },
        { provide: 'Cryptography', useClass: CryptographyBcrypt },
        {
            provide: 'product_producer',
            useFactory: (kafkaClient: ClientKafka) => kafkaClient,
            inject: ['product_producer_client'],
        },
    ],
})
export class AuthModule {}
