import { User } from '../entities/user';

export type UserRepositoryWhereOptions = {
    id: number;
    name: string;
    surname: string;
    email: string;
    birthdate: Date;
    phoneNumber: string;
};

export interface IUserRepository {
    create(user: User): Promise<User>;
    find(whereOptions?: UserRepositoryWhereOptions): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    update(id: number, user: User): Promise<void>;
    delete(id: number): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
}
