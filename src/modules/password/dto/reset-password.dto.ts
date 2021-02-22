import { IsDefined, IsEmail, IsString, MinLength, Validate } from "class-validator";

import { EqualsAttribute } from "@shared/equals-attribute.validator";

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
    @Validate(EqualsAttribute, ["password"])
    public readonly passwordConfirmation: string;
}
