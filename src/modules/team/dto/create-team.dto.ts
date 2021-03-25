import { Transform } from 'class-transformer';
import { IsDefined, IsNumber, IsString, IsUrl, Length, Validate } from 'class-validator';

import { DateHelper } from '@shared/helpers/date.helper';
import { ValidDate } from '@shared/validators/valid-date.validator';

export class CreateTeamDto {
    @IsDefined()
    @IsString()
    public readonly name: string;

    @IsDefined()
    @IsString()
    public readonly knownby: string;

    @IsDefined()
    @IsString()
    @Length(3, 3)
    public readonly initials: string;

    @IsUrl()
    public readonly logoURL?: string;

    @IsDefined()
    @Transform(({ value }) => DateHelper.parseFromSQLDate(value))
    @Validate(ValidDate)
    public readonly foundationDate: string;

    @IsDefined()
    @IsNumber()
    public readonly stadiumId: number;
}
