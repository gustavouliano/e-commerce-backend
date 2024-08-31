import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../repository/user.repository';

@Injectable()
export class FindUserUseCase {
    constructor(@Inject('IUserRepository') private readonly repository: IUserRepository) {}

    async execute() {
        return await this.repository.find();
    }
}
