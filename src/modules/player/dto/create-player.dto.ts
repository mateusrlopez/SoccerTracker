import { IsDefined, IsEnum, IsNumber, IsString, IsUrl } from 'class-validator';

import { Position } from '@shared/enums/poisition.enum';
import { PreferredFoot } from '@shared/enums/preferred-foot.enum';

export class CreatePlayerDto {
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

    @IsString()
    @IsUrl()
    public readonly pictureURL?: string;

    @IsDefined()
    @IsNumber()
    public readonly height: number;

    @IsNumber()
    public readonly shirtNumber?: number;

    @IsDefined()
    @IsEnum(Position)
    public readonly position: Position;

    @IsDefined()
    @IsEnum(PreferredFoot)
    public readonly preferredFoot: PreferredFoot;

    @IsDefined()
    @IsString()
    public readonly birthdate: string;
}
