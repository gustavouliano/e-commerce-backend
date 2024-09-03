import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 45,
    })
    name: string;

    @Column({
        length: 45,
    })
    surname: string;

    @Column({ unique: true })
    email: string;

    @Column({
        // select: false,
    })
    password: string;

    @Column()
    birthdate: Date;

    @Column()
    phoneNumber: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
