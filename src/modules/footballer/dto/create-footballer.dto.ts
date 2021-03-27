import { Transform } from 'class-transformer';
import { IsDefined, IsEnum, IsNumber, IsString, IsUrl, Validate } from 'class-validator';
import { DateTime } from 'luxon';

import { Function } from '@footballer/enums/function.enum';
import { DateHelper } from '@shared/helpers/date.helper';
import { ValidDate } from '@shared/validators/valid-date.validator';

import { Position } from '../enums/position.enum';
import { PreferredFoot } from '../enums/preferred-foot.enum';
import { ICreateFootballer } from '../interfaces/create-footballer.interface';

export class CreateFootballerDto implements ICreateFootballer {
    @IsDefined()
    @IsString()
    public readonly firstName: string;

    @IsDefined()
    @IsString()
    public readonly middleName: string;

    @IsDefined()
    @IsString()
    public readonly lastName: string;

    @IsDefined()
    @IsString()
    public readonly knownby: string;

    @IsDefined()
    @Transform(({ value }) => DateHelper.parseFromSQLDate(value))
    @Validate(ValidDate)
    public readonly birthdate: DateTime;

    @IsDefined()
    @IsNumber()
    public readonly height: number;

    @IsDefined()
    @IsNumber()
    public readonly weight: number;

    @IsDefined()
    @IsEnum(Position)
    public readonly position: Position;

    @IsDefined()
    @IsEnum(Function)
    public readonly function: Function;

    @IsDefined()
    @IsEnum(PreferredFoot)
    public readonly preferredFoot: PreferredFoot;

    @IsUrl()
    public readonly pictureURL?: string;

    @IsString()
    public readonly bio?: string;

    @IsNumber()
    public readonly shirtNumber?: number;

    @IsNumber()
    public readonly teamId?: number;
}
