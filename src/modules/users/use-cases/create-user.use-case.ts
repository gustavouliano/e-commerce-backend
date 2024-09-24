import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../repository/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user';
import { Cryptography } from 'src/shared/interfaces/cryptography';

@Injectable()
export class CreateUserUseCase {
    constructor(
        @Inject('IUserRepository') private readonly repository: IUserRepository,
        @Inject('Cryptography') private readonly crypt: Cryptography,
    ) {}

    async execute(input: CreateUserDto) {
        const userEmailExists = await this.repository.findByEmail(input.email);
        if (userEmailExists) {
            throw new ConflictException('Email already exists.');
        }
        const user = new User();
        Object.assign(user, input);
        user.password = this.crypt.hash(user.password, 10);
        return await this.repository.create(user);
    }
}
