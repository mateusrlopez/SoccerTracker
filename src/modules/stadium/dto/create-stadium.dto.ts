import { Transform } from 'class-transformer';
import { IsDefined, IsNumber, IsString, IsUrl, Validate } from 'class-validator';
import { DateTime } from 'luxon';

import { DateHelper } from '@shared/helpers/date.helper';
import { ValidDate } from '@shared/validators/valid-date.validator';

import { ICreateStadium } from '../interfaces/create-stadium.interface';

export class CreateStadiumDto implements ICreateStadium {
    @IsDefined()
    @IsString()
    public readonly name: string;

    @IsDefined()
    @IsString()
    public readonly knownby: string;

    @IsDefined()
    @Transform(({ value }) => DateHelper.parseFromSQLDate(value))
    @Validate(ValidDate)
    public readonly foundationDate: DateTime;

    @IsUrl()
    public readonly pictureURL?: string;

    @IsDefined()
    @IsString()
    public readonly address: string;

    @IsDefined()
    @IsNumber()
    public readonly capacity: number;

    @IsString()
    public readonly bio?: string;
}
