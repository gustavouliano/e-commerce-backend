import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { CreateUserUseCase } from 'src/modules/users/use-cases/create-user.use-case';
import { LoginUseCase } from './login.use-case';

// TODO: verify usecase from another module
@Injectable()
export class RegisterUseCase {
    constructor(
        @Inject() private createUserUseCase: CreateUserUseCase,
        @Inject() private loginUseCase: LoginUseCase,
    ) {}

    async execute(input: CreateUserDto) {
        const user = await this.createUserUseCase.execute(input);
        return this.loginUseCase.execute(user);
    }
}
