import {
    IsDefined,
    IsEmail,
    IsNumber,
    IsOptional,
    IsString,
    IsUrl,
    Validate,
} from "class-validator";

import { UniqueUser } from "../validations/unique-user.validation";

export class CreateUserDto {
    @IsDefined()
    @IsString()
    public readonly name: string;

    @IsDefined()
    @IsString()
    public readonly password: string;

    @IsDefined()
    @IsEmail()
    @Validate(UniqueUser)
    public readonly email: string;

    @IsDefined()
    @IsString()
    public readonly birthdate: string;

    @IsOptional()
    @IsUrl()
    public readonly photoURL: string | null;

    @IsOptional()
    @IsNumber()
    public readonly teamId: number | null;
}
