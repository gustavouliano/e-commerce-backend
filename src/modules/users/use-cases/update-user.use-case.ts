import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../repository/user.repository';
import { User } from '../entities/User';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UpdateUserUseCase {
    constructor(@Inject('IUserRepository') private readonly repository: IUserRepository) {}

    async execute(id: number, input: UpdateUserDto) {
        const user = new User();
        if (input.email) {
            const userEmail = await this.repository.findByEmail(input.email);
            if (userEmail && userEmail.id !== id) {
                throw new ConflictException('This email is already registered.');
            }
        }
        Object.assign(user, input);
        await this.repository.update(id, user);
        return await this.repository.findById(id);
    }
}
