import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUrl,
    Length,
    MaxLength,
} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(25)
    public readonly firstName: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(25)
    public readonly lastName: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 45)
    public readonly password: string;

    @IsNotEmpty()
    @IsEmail()
    public readonly email: string;

    @IsNotEmpty()
    @IsString()
    public readonly birthdate: string;

    @IsOptional()
    @IsUrl()
    public readonly photoURL: string | null;

    @IsOptional()
    @IsNumber()
    public readonly teamId: number | null;
}
