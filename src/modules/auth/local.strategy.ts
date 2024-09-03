import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from '../users/entities/User';
import { ValidateUserUseCase } from './use-cases/validate-user.use-case';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private validateUserUseCase: ValidateUserUseCase) {
        super({
            usernameField: 'email',
        });
    }

    async validate(email: string, password: string): Promise<User> {
        const user = await this.validateUserUseCase.execute(email, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
