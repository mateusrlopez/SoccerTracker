import { IsEmail, IsNotEmpty, IsString, Length, MaxLength } from 'class-validator';

import { IsSame } from '@shared/is-same.validator';

export class ResetPasswordDto {
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(45)
    public readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(32)
    public readonly token: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 40)
    public readonly password: string;

    @IsNotEmpty()
    @IsString()
    @IsSame('password')
    public readonly passwordConfirmation: string;
}
