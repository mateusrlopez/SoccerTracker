import { IsEmail, IsNotEmpty } from 'class-validator';

import { UserExists } from '@user/validators/user-exists.validator';

export class RequestPasswordResetDto {
    @IsNotEmpty()
    @IsEmail()
    @UserExists()
    public readonly email: string;
}
