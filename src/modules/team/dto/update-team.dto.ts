import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUrl,
    Length,
    MaxLength,
} from 'class-validator';

export class UpdateTeamDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MaxLength(25)
    public readonly name?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MaxLength(25)
    public readonly knownby?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Length(3, 3)
    public readonly initials?: string;

    @IsOptional()
    @IsUrl()
    public readonly logoURL?: string | null;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    public readonly foundationDate?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    public readonly stadiumId?: number;
}
