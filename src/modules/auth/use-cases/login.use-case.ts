import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/users/entities/user';

// TODO: verify repository from another module
@Injectable()
export class LoginUseCase {
    constructor(@Inject() private jwtService: JwtService) {}

    async execute(user: User) {
        const payload = { email: user.email, id: user.id };
        return { access_token: this.jwtService.sign(payload) };
    }
}
