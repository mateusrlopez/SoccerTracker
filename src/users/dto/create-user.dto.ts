import { IsDate, IsEmail, IsNotEmpty } from 'class-validator';

export interface ICreateUser {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthdate: Date;
}

export class CreateUserDto implements ICreateUser {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsDate()
    birthdate: Date;
}
