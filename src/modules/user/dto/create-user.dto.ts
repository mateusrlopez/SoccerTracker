import { Transform } from 'class-transformer';
import {
    IsDefined,
    IsEmail,
    IsNumber,
    IsString,
    IsUrl,
    MinLength,
    Validate,
} from 'class-validator';
import { DateTime } from 'luxon';

import { DateHelper } from '@shared/helpers/date.helper';
import { ValidDate } from '@shared/validators/valid-date.validator';

export class CreateUserDto {
    @IsDefined()
    @IsString()
    public readonly firstName: string;

    @IsDefined()
    @IsString()
    public readonly lastName: string;

    @IsDefined()
    @IsString()
    @MinLength(8)
    public readonly password: string;

    @IsDefined()
    @IsEmail()
    public readonly email: string;

    @IsDefined()
    @Transform(({ value }) => DateHelper.parseFromSQLDate(value))
    @Validate(ValidDate)
    public readonly birthdate: DateTime;

    @IsUrl()
    public readonly photoURL?: string;

    @IsDefined()
    @IsNumber()
    public readonly teamId: number;
}
