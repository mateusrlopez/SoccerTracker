import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUrl,
    MaxLength,
    Validate,
} from 'class-validator';

import { EntityExists } from '@shared/validators/entity-exists.validator';
import { Team } from '@team/entities/team.entity';

export class UpdateUserDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MaxLength(25)
    public readonly firstName?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MaxLength(25)
    public readonly lastName?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    public readonly birthdate?: string;

    @IsOptional()
    @IsUrl()
    public readonly photoURL?: string | null;

    @IsOptional()
    @IsNumber()
    @Validate(EntityExists, [Team])
    public readonly teamId?: number;
}
