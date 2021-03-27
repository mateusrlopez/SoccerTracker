import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsUrl, Length, Validate } from 'class-validator';
import { DateTime } from 'luxon';

import { DateHelper } from '@shared/helpers/date.helper';
import { ValidDate } from '@shared/validators/valid-date.validator';

import { IUpdateTeam } from '../interfaces/update-team.interface';

export class UpdateTeamDto implements IUpdateTeam {
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

    @IsNotEmpty()
    @Transform(({ value }) => DateHelper.parseFromSQLDate(value))
    @Validate(ValidDate)
    public readonly foundationDate?: DateTime;

    @IsUrl()
    public readonly logoURL?: string;

    @IsString()
    public readonly bio?: string;

    @IsNotEmpty()
    @IsNumber()
    public readonly stadiumId?: number;
}
