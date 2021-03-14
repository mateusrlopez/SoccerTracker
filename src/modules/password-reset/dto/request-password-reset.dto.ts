import { IsEmail, IsNotEmpty } from 'class-validator';

export class RequestPasswordResetDto {
    @IsNotEmpty()
    @IsEmail()
    public readonly userEmail: string;
}
