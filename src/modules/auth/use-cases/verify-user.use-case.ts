import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from 'src/modules/users/repository/user.repository';
import { LoginUseCase } from './login.use-case';

@Injectable()
export class VerifyUserUseCase {
    constructor(
        @Inject('IUserRepository') private userRepository: IUserRepository,
        @Inject() private jwtService: JwtService,
        @Inject() private loginUseCase: LoginUseCase,
    ) {}
    async execute(id: number, token: string) {
        const tokenInfo = this.jwtService.decode(token);
        const user = await this.userRepository.findByEmail(tokenInfo.email);
        if (!user) {
            throw new Error("User doesn't exists.");
        }
        user.verified = true;
        await this.userRepository.update(user.id, user);
        return this.loginUseCase.execute(user);
    }
}
