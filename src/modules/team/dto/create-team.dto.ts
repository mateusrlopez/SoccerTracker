import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUrl,
    Length,
    MaxLength,
} from 'class-validator';

import { StadiumExists } from '@stadium/validators/stadium-exists.validator';

export class CreateTeamDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(25)
    public readonly name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(25)
    public readonly knownby: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 3)
    public readonly initials: string;

    @IsOptional()
    @IsUrl()
    public readonly logoURL: string | null;

    @IsNotEmpty()
    @IsString()
    public readonly foundationDate: string;

    @IsNotEmpty()
    @IsNumber()
    @StadiumExists()
    public readonly stadiumId: number;
}
