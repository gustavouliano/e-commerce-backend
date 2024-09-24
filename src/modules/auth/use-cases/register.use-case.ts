import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { CreateUserUseCase } from 'src/modules/users/use-cases/create-user.use-case';
import { ClientKafka } from '@nestjs/microservices';
import { User } from 'src/modules/users/entities/user';
import { JwtService } from '@nestjs/jwt';

// TODO: verify usecase from another module
@Injectable()
export class RegisterUseCase {
    constructor(
        @Inject() private createUserUseCase: CreateUserUseCase,
        @Inject('product_producer') private clientKafka: ClientKafka,
        @Inject() private jwtService: JwtService,
    ) {}

    async execute(input: CreateUserDto) {
        const user = await this.createUserUseCase.execute(input);
        this.sendEmailVerification(user);
    }

    private sendEmailVerification(user: User) {
        const payload = { email: user.email, id: user.id };
        return this.clientKafka.emit('email-user-verification-topic', {
            userId: user.id,
            email: user.email,
            token: this.jwtService.sign(payload),
        });
    }
}
