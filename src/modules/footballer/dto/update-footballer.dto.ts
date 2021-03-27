import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUrl, Validate } from 'class-validator';
import { DateTime } from 'luxon';

import { DateHelper } from '@shared/helpers/date.helper';
import { ValidDate } from '@shared/validators/valid-date.validator';

import { Function } from '../enums/function.enum';
import { Position } from '../enums/position.enum';
import { PreferredFoot } from '../enums/preferred-foot.enum';
import { IUpdateFootballer } from '../interfaces/update-footballer.interface';

export class UpdateFootballerDto implements IUpdateFootballer {
    @IsNotEmpty()
    @IsString()
    public readonly firstName: string;

    @IsNotEmpty()
    @IsString()
    public readonly middleName: string;

    @IsNotEmpty()
    @IsString()
    public readonly lastName: string;

    @IsNotEmpty()
    @IsString()
    public readonly knownby: string;

    @IsNotEmpty()
    @Transform(({ value }) => DateHelper.parseFromSQLDate(value))
    @Validate(ValidDate)
    public readonly birthdate: DateTime;

    @IsNotEmpty()
    @IsNumber()
    public readonly height: number;

    @IsNotEmpty()
    @IsNumber()
    public readonly weight: number;

    @IsNotEmpty()
    @IsEnum(Position)
    public readonly position: Position;

    @IsNotEmpty()
    @IsEnum(Function)
    public readonly function: Function;

    @IsNotEmpty()
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
