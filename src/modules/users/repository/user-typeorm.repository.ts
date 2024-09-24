import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user';
import { IUserRepository, UserRepositoryWhereOptions } from './user.repository';
import { Repository } from 'typeorm';

export class UserTypeormRepository implements IUserRepository {
    constructor(@InjectRepository(User) private repository: Repository<User>) {}

    async create(user: User): Promise<User> {
        return await this.repository.save(user);
    }

    async find(whereOptions?: UserRepositoryWhereOptions): Promise<User[]> {
        return await this.repository.find({ where: whereOptions });
    }

    async findById(id: number): Promise<User | null> {
        return await this.repository.findOne({ where: { id } });
    }

    async update(id: number, user: User): Promise<void> {
        await this.repository.update(id, user);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.repository.findOne({ where: { email } });
    }
}
