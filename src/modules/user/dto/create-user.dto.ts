import {
    IsDefined,
    IsEmail,
    IsNumber,
    IsString,
    IsUrl,
    MinLength,
    Validate,
} from 'class-validator';

import { EntityExists } from '@shared/validators/entity-exists.validator';
import { UniqueEntity } from '@shared/validators/unique-entity.validator';
import { Team } from '@team/entities/team.entity';

import { User } from '../entities/user.entity';

export class CreateUserDto {
    @IsDefined()
    @IsString()
    public readonly firstName: string;

    @IsDefined()
    @IsString()
    public readonly lastName: string;

    @IsDefined()
    @IsString()
    @MinLength(8)
    public readonly password: string;

    @IsDefined()
    @IsEmail()
    @Validate(UniqueEntity, [User, 'email'])
    public readonly email: string;

    @IsDefined()
    @IsString()
    public readonly birthdate: string;

    @IsUrl()
    public readonly photoURL?: string;

    @IsDefined()
    @IsNumber()
    @Validate(EntityExists, [Team])
    public readonly teamId: number;
}
