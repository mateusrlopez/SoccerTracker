import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class UpdatePlayerDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MaxLength(25)
    public readonly firstName?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MaxLength(25)
    public readonly middleName?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MaxLength(25)
    public readonly lastName?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    public readonly knownby?: string;

    @IsOptional()
    @IsString()
    @IsUrl()
    public readonly pictureURL?: string | null;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    public readonly height?: number;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    public readonly birthdate?: string;
}
