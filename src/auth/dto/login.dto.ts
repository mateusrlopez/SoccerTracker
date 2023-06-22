import { IsEmail, IsNotEmpty } from 'class-validator';

export interface ILoginData {
    email: string;
    password: string;
}

export class LoginDto implements ILoginData {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
