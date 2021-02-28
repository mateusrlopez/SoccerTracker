import { IsDefined, IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

import { IsSame } from '@shared/is-same.validator';

export class ResetPasswordDto {
    @IsDefined()
    @IsEmail()
    @MaxLength(45)
    public readonly email: string;

    @IsDefined()
    @IsString()
    @MaxLength(32)
    public readonly token: string;

    @IsDefined()
    @IsString()
    @MinLength(8)
    @MaxLength(40)
    public readonly password: string;

    @IsDefined()
    @IsString()
    @IsSame('password')
    public readonly passwordConfirmation: string;
}
