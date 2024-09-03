import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/modules/users/repository/user.repository';
import { Cryptography } from 'src/shared/interfaces/cryptography';

@Injectable()
export class ValidateUserUseCase {
    constructor(
        @Inject('IUserRepository') private userRepository: IUserRepository,
        @Inject('Cryptography') private crypt: Cryptography,
    ) {}

    async execute(email: string, password: string) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new BadRequestException("Email doesn't exists");
        }
        const isMatch = this.crypt.compare(password, user.password);
        if (!isMatch) {
            throw new BadRequestException("Password doesn't match");
        }
        return user;
    }
}
