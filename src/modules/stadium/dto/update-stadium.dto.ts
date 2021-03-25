import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsUrl, Validate } from 'class-validator';

import { DateHelper } from '@shared/helpers/date.helper';
import { ValidDate } from '@shared/validators/valid-date.validator';

export class UpdateStadiumDto {
    @IsNotEmpty()
    @IsString()
    public readonly name?: string;

    @IsNotEmpty()
    @IsString()
    public readonly knownby?: string;

    @IsNotEmpty()
    @Transform(({ value }) => DateHelper.parseFromSQLDate(value))
    @Validate(ValidDate)
    public readonly foundationDate?: string;

    @IsNotEmpty()
    @IsNumber()
    public readonly capacity?: number;

    @IsUrl()
    public readonly pictureURL?: string;
}
