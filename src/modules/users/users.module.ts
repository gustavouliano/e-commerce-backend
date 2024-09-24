import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user';
import { UsersController } from './users.controller';
import { UserTypeormRepository } from './repository/user-typeorm.repository';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { FindUserUseCase } from './use-cases/find-user.use-case';
import { CryptographyBcrypt } from 'src/shared/services/crypt/cryptography-bcrypt';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';
import { FindOneUserUseCase } from './use-cases/find-one-user.use-case';
import { DeleteUserUseCase } from './use-cases/delete-user.use-case';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [
        CreateUserUseCase,
        FindUserUseCase,
        FindOneUserUseCase,
        UpdateUserUseCase,
        DeleteUserUseCase,
        CryptographyBcrypt,
        UserTypeormRepository,
        { provide: 'IUserRepository', useClass: UserTypeormRepository },
        { provide: 'Cryptography', useClass: CryptographyBcrypt },
    ],
})
export class UsersModule {}
