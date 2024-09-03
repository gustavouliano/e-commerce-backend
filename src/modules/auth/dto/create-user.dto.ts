import { IsDateString, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MaxLength(45)
    name: string;

    @IsString()
    @MaxLength(45)
    surname: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsDateString()
    birthdate: Date;

    @IsString()
    phoneNumber: string;
}
