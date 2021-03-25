import { IsDefined, IsEmail } from 'class-validator';

export class RequestPasswordResetDto {
    @IsDefined()
    @IsEmail()
    public readonly userEmail: string;
}
