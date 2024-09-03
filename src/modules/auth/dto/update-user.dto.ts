import { IsString, MaxLength, IsDate, IsOptional } from 'class-validator';

// TODO: maybe different dto and usecase for password changes? verify
export class UpdateUserDto {
    @IsString()
    @MaxLength(45)
    @IsOptional()
    name?: string;

    @IsString()
    @MaxLength(45)
    @IsOptional()
    surname?: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsDate()
    @IsOptional()
    birthdate?: Date;

    @IsString()
    @IsOptional()
    phoneNumber?: string;
}
