import { Transform } from 'class-transformer';
import { IsDefined, IsNumber, IsString, IsUrl, Validate } from 'class-validator';
import { DateTime } from 'luxon';

import { DateHelper } from '@shared/helpers/date.helper';
import { ValidDate } from '@shared/validators/valid-date.validator';

export class CreateManagerDto {
    @IsDefined()
    @IsString()
    public firstName: string;

    @IsDefined()
    @IsString()
    public middleName: string;

    @IsDefined()
    @IsString()
    public lastName: string;

    @IsUrl()
    public pictureURL?: string;

    @IsDefined()
    @Transform(({ value }) => DateHelper.parseFromSQLDate(value))
    @Validate(ValidDate)
    public birthdate: DateTime;

    @IsNumber()
    public teamId?: number;
}
