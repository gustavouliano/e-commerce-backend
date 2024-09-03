import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { IUserRepository } from 'src/modules/users/repository/user.repository';
import { CreateUserUseCase } from 'src/modules/users/use-cases/create-user.use-case';
import { Cryptography } from 'src/shared/interfaces/cryptography';
import { LoginUseCase } from './login.use-case';

// TODO: verify usecase from another module
@Injectable()
export class RegisterUseCase {
    constructor(
        @Inject('IUserRepository') private userRepository: IUserRepository,
        @Inject() private createUserUseCase: CreateUserUseCase,
        @Inject('Cryptography') private readonly crypt: Cryptography,
        @Inject() private jwtService: JwtService,
        @Inject() private loginUseCase: LoginUseCase,
    ) {}

    async execute(input: CreateUserDto) {
        const user = await this.createUserUseCase.execute(input);
        return this.loginUseCase.execute(user);
    }
}
