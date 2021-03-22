import { IsNotEmpty, IsNumber, IsString, IsUrl, Validate } from 'class-validator';

import { EntityExists } from '@shared/validators/entity-exists.validator';
import { Team } from '@team/entities/team.entity';

export class UpdateUserDto {
    @IsNotEmpty()
    @IsString()
    public readonly firstName?: string;

    @IsNotEmpty()
    @IsString()
    public readonly lastName?: string;

    @IsNotEmpty()
    @IsString()
    public readonly birthdate?: string;

    @IsUrl()
    public readonly photoURL?: string;

    @IsNumber()
    @Validate(EntityExists, [Team])
    public readonly teamId?: number;
}
