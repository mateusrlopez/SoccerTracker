import { Transform } from 'class-transformer';
import { IsDefined, IsNumber, IsString, IsUrl, Validate } from 'class-validator';
import { DateTime } from 'luxon';

import { DateHelper } from '@shared/helpers/date.helper';
import { ValidDate } from '@shared/validators/valid-date.validator';

export class CreateStadiumDto {
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

    @IsDefined()
    @IsNumber()
    public readonly capacity: number;

    @IsUrl()
    public readonly pictureURL?: string;
}
