import { IsDefined, IsEmail, IsString, MinLength } from 'class-validator';

import { IsSame } from '@shared/is-same.validator';

export class ResetPasswordDto {
    @IsDefined()
    @IsEmail()
    public readonly email: string;

    @IsDefined()
    @IsString()
    public readonly token: string;

    @IsDefined()
    @IsString()
    @MinLength(8)
    public readonly password: string;

    @IsDefined()
    @IsString()
    @IsSame('password')
    public readonly passwordConfirmation: string;
}
