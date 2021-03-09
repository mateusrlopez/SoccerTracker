import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class UpdateStadiumDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MaxLength(35)
    public readonly name?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    public readonly knownby?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    public readonly foundationDate?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    public readonly capacity?: number;

    @IsOptional()
    @IsUrl()
    public readonly pictureURL?: string | null;
}
