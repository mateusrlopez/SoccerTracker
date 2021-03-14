import { IsEmail, IsNotEmpty, IsString, Length, MaxLength, Validate } from 'class-validator';

import { IsSame } from '@validators/is-same.validator';

export class ResetPasswordDto {
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(45)
    public readonly userEmail: string;

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
    @Validate(IsSame, ['password'])
    public readonly passwordConfirmation: string;
}
