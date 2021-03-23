import { IsNotEmpty, IsNumber, IsString, IsUrl, Length, Validate } from 'class-validator';

import { ValidDate } from '@shared/validators/valid-date.validator';

export class UpdateTeamDto {
    @IsNotEmpty()
    @IsString()
    public readonly name?: string;

    @IsNotEmpty()
    @IsString()
    public readonly knownby?: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 3)
    public readonly initials?: string;

    @IsUrl()
    public readonly logoURL?: string;

    @IsNotEmpty()
    @IsString()
    @Validate(ValidDate)
    public readonly foundationDate?: string;

    @IsNotEmpty()
    @IsNumber()
    public readonly stadiumId?: number;
}
