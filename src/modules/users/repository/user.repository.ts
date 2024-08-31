import { User } from '../entities/User';

export interface IUserRepository {
    create(user: User): Promise<User>;
    find(): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    update(id: number, user: User): Promise<void>;
    delete(id: number): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
}
