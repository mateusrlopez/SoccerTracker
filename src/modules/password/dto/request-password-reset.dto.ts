import { IsDefined, IsEmail, Validate } from "class-validator";

import { UserExists } from "@user/validations/user-exists.validator";

export class RequestPasswordResetDto {
    @IsDefined()
    @IsEmail()
    @Validate(UserExists)
    public readonly email: string;
}
