import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MaxLength(25)
    public readonly firstName?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MaxLength(25)
    public readonly lastName?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    public readonly birthdate?: string;

    @IsOptional()
    @IsUrl()
    public readonly photoURL?: string | null;

    @IsOptional()
    @IsNumber()
    public readonly teamId?: number | null;
}
