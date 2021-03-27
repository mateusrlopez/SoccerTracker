import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsUrl, Validate } from 'class-validator';
import { DateTime } from 'luxon';

import { DateHelper } from '@shared/helpers/date.helper';
import { ValidDate } from '@shared/validators/valid-date.validator';

import { IUpdateStadium } from '../interfaces/update-stadium.interface';

export class UpdateStadiumDto implements IUpdateStadium {
    @IsNotEmpty()
    @IsString()
    public readonly name?: string;

    @IsNotEmpty()
    @IsString()
    public readonly knownby?: string;

    @IsNotEmpty()
    @Transform(({ value }) => DateHelper.parseFromSQLDate(value))
    @Validate(ValidDate)
    public readonly foundationDate?: DateTime;

    @IsUrl()
    public readonly pictureURL?: string;

    @IsNotEmpty()
    @IsString()
    public readonly address?: string;

    @IsNotEmpty()
    @IsNumber()
    public readonly capacity?: number;

    @IsString()
    public readonly bio?: string;
}
