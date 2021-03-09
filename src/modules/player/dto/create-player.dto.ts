import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreatePlayerDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(25)
    public readonly firstName: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(25)
    public readonly middleName: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(25)
    public readonly lastName: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    public readonly knownby: string;

    @IsOptional()
    @IsString()
    @IsUrl()
    public readonly pictureURL: string | null;

    @IsNotEmpty()
    @IsNumber()
    public readonly height: number;

    @IsNotEmpty()
    @IsString()
    public readonly birthdate: string;
}
