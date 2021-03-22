import { IsDefined, IsEmail, IsString, MaxLength, MinLength, Validate } from 'class-validator';

import { IsSame } from '@shared/validators/is-same.validator';

export class ResetPasswordDto {
    @IsDefined()
    @IsEmail()
    public readonly userEmail: string;

    @IsDefined()
    @IsString()
    @MaxLength(60)
    public readonly token: string;

    @IsDefined()
    @IsString()
    @MinLength(8)
    public readonly password: string;

    @IsDefined()
    @IsString()
    @Validate(IsSame, ['password'])
    public readonly passwordConfirmation: string;
}
