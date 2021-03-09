import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateStadiumDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(35)
    public readonly name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    public readonly knownby: string;

    @IsNotEmpty()
    @IsString()
    public readonly foundationDate: string;

    @IsNotEmpty()
    @IsNumber()
    public readonly capacity: number;

    @IsOptional()
    @IsUrl()
    public readonly pictureURL: string | null;
}
