import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, Validate } from 'class-validator';
import { DateTime } from 'luxon';

import { IUpdateMatch } from '@match/interfaces/update-match.interface';
import { DateHelper } from '@shared/helpers/date.helper';
import { IsDifferent } from '@shared/validators/is-different.validator';
import { ValidDate } from '@shared/validators/valid-date.validator';

export class UpdateMatchDto implements IUpdateMatch {
    @IsNotEmpty()
    @Transform(({ value }) => DateHelper.parseFromUserGivenTimestamp(value))
    @Validate(ValidDate)
    public readonly datetime: DateTime;

    @IsNotEmpty()
    @IsNumber()
    public readonly totalPublic: number;

    @IsNotEmpty()
    @IsNumber()
    public readonly homeTeamId: number;

    @IsNotEmpty()
    @IsNumber()
    @Validate(IsDifferent, ['homeTeamId'])
    public readonly awayTeamId: number;

    @IsNotEmpty()
    @IsNumber()
    public readonly stadiumId: number;
}
