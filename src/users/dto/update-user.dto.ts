import { IsDate, IsEmail, IsNotEmpty } from 'class-validator';

export interface IUpdateUser {
    email: string;
    firstName: string;
    lastName: string;
    birthdate: Date;
}

export class UpdateUserDto implements IUpdateUser {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    email: string;

    @IsDate()
    birthdate: Date;
}
