import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsUrl, Validate } from 'class-validator';
import { DateTime } from 'luxon';

import { DateHelper } from '@shared/helpers/date.helper';
import { ValidDate } from '@shared/validators/valid-date.validator';

export class UpdateManagerDto {
    @IsNotEmpty()
    @IsString()
    public firstName?: string;

    @IsNotEmpty()
    @IsString()
    public middleName?: string;

    @IsNotEmpty()
    @IsString()
    public lastName?: string;

    @IsUrl()
    public pictureURL?: string;

    @IsNotEmpty()
    @Transform(({ value }) => DateHelper.parseFromSQLDate(value))
    @Validate(ValidDate)
    public birthdate?: DateTime;

    @IsNumber()
    public teamId?: number;
}
