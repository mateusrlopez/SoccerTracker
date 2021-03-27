import { Transform } from 'class-transformer';
import { IsDefined, IsNumber, IsString, IsUrl, Length, Validate } from 'class-validator';
import { DateTime } from 'luxon';

import { DateHelper } from '@shared/helpers/date.helper';
import { ValidDate } from '@shared/validators/valid-date.validator';

import { ICreateTeam } from '../interfaces/create-team.interface';

export class CreateTeamDto implements ICreateTeam {
    @IsDefined()
    @IsString()
    public readonly name: string;

    @IsDefined()
    @IsString()
    public readonly knownby: string;

    @IsDefined()
    @IsString()
    @Length(3, 3)
    public readonly initials: string;

    @IsDefined()
    @Transform(({ value }) => DateHelper.parseFromSQLDate(value))
    @Validate(ValidDate)
    public readonly foundationDate: DateTime;

    @IsUrl()
    public readonly logoURL?: string;

    @IsString()
    public readonly bio?: string;

    @IsDefined()
    @IsNumber()
    public readonly stadiumId: number;
}
