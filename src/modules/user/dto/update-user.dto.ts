import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsUrl, Validate } from 'class-validator';
import { DateTime } from 'luxon';

import { DateHelper } from '@shared/helpers/date.helper';
import { ValidDate } from '@shared/validators/valid-date.validator';

export class UpdateUserDto {
    @IsNotEmpty()
    @IsString()
    public readonly firstName?: string;

    @IsNotEmpty()
    @IsString()
    public readonly lastName?: string;

    @IsNotEmpty()
    @Transform(({ value }) => DateHelper.parseFromSQLDate(value))
    @Validate(ValidDate)
    public readonly birthdate?: DateTime;

    @IsUrl()
    public readonly photoURL?: string;

    @IsNumber()
    public readonly teamId?: number;
}
