import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/users/entities/user';

@Injectable()
export class RefreshUseCase {
    constructor(@Inject() private jwtService: JwtService) {}

    async execute(user: User) {
        const payload = { email: user.email, id: user.id };
        return { refresh_token: this.jwtService.sign(payload) };
    }
}
