import { IsDefined, IsEmail } from 'class-validator';

import { UserExists } from '@user/validations/user-exists.validator';

export class RequestPasswordResetDto {
    @IsDefined()
    @IsEmail()
    @UserExists()
    public readonly email: string;
}
