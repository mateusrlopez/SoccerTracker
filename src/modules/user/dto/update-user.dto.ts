import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsString, IsUrl, Validate } from 'class-validator';
import { DateTime } from 'luxon';

import { DateHelper } from '@shared/helpers/date.helper';
import { ValidDate } from '@shared/validators/valid-date.validator';

import { IUpdateUser } from '../interfaces/update-user.interface';

export class UpdateUserDto implements IUpdateUser {
    @IsNotEmpty()
    @IsString()
    public readonly firstName?: string;

    @IsNotEmpty()
    @IsString()
    public readonly lastName?: string;

    @IsBoolean()
    public readonly emailVerified?: boolean;

    @IsNotEmpty()
    @Transform(({ value }) => DateHelper.parseFromSQLDate(value))
    @Validate(ValidDate)
    public readonly birthdate?: DateTime;

    @IsString()
    public readonly bio?: string;

    @IsUrl()
    public readonly photoURL?: string;

    @IsNumber()
    public readonly teamId?: number;
}
