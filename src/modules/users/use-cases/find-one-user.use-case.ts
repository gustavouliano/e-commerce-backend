import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../repository/user.repository';

@Injectable()
export class FindOneUserUseCase {
    constructor(@Inject('IUserRepository') private readonly repository: IUserRepository) {}

    async execute(id: number) {
        return await this.repository.findById(id);
    }
}
