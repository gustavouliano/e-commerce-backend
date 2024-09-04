import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/User';
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
    ],
    controllers: [AuthController],
    providers: [
        LoginUseCase,
        RegisterUseCase,
        ValidateUserUseCase,
        LocalStrategy,
        JwtStrategy,
        CreateUserUseCase,
        { provide: 'IUserRepository', useClass: UserTypeormRepository },
        { provide: 'Cryptography', useClass: CryptographyBcrypt },
    ],
})
export class AuthModule {}
