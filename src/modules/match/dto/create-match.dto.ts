import { Transform } from 'class-transformer';
import { IsDefined, IsNumber, Validate } from 'class-validator';
import { DateTime } from 'luxon';

import { ICreateMatch } from '@match/interfaces/create-match.interface';
import { DateHelper } from '@shared/helpers/date.helper';
import { IsDifferent } from '@shared/validators/is-different.validator';
import { ValidDate } from '@shared/validators/valid-date.validator';

export class CreateMatchDto implements ICreateMatch {
    @IsDefined()
    @Transform(({ value }) => DateHelper.parseFromUserGivenTimestamp(value))
    @Validate(ValidDate)
    public readonly datetime: DateTime;

    @IsDefined()
    @IsNumber()
    public readonly totalPublic: number;

    @IsDefined()
    @IsNumber()
    public readonly homeTeamId: number;

    @IsDefined()
    @IsNumber()
    @Validate(IsDifferent, ['homeTeamId'])
    public readonly awayTeamId: number;

    @IsDefined()
    @IsNumber()
    public readonly stadiumId: number;
}
