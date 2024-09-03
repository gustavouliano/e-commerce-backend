import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/users/entities/User';
import { IUserRepository } from 'src/modules/users/repository/user.repository';
import { Cryptography } from 'src/shared/interfaces/cryptography';

// TODO: verify repository from another module
@Injectable()
export class LoginUseCase {
    constructor(
        @Inject('IUserRepository') private userRepository: IUserRepository,
        @Inject('Cryptography') private crypt: Cryptography,
        @Inject() private jwtService: JwtService,
    ) {}

    async execute(user: User) {
        const payload = { email: user.email, id: user.id };
        return { access_token: this.jwtService.sign(payload) };
    }
}
