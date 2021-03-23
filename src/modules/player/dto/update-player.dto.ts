import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

import { Position } from '../enums/poisition.enum';
import { PreferredFoot } from '../enums/preferred-foot.enum';

export class UpdatePlayerDto {
    @IsNotEmpty()
    @IsString()
    public readonly firstName?: string;

    @IsNotEmpty()
    @IsString()
    public readonly middleName?: string;

    @IsNotEmpty()
    @IsString()
    public readonly lastName?: string;

    @IsNotEmpty()
    @IsString()
    public readonly knownby?: string;

    @IsString()
    @IsUrl()
    public readonly pictureURL?: string | null;

    @IsNotEmpty()
    @IsNumber()
    public readonly height?: number;

    @IsNumber()
    public readonly shirtNumber?: number;

    @IsNotEmpty()
    @IsEnum(Position)
    public readonly position?: Position;

    @IsNotEmpty()
    @IsEnum(PreferredFoot)
    public readonly preferredFoot?: PreferredFoot;

    @IsNotEmpty()
    @IsString()
    public readonly birthdate?: string;
}
