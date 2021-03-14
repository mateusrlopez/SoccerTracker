import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUrl,
    Length,
    MaxLength,
    Validate,
} from 'class-validator';

import { EntityExists } from '@shared/validators/entity-exists.validator';
import { UniqueEntity } from '@shared/validators/unique-entity.validator';
import { Team } from '@team/entities/team.entity';

import { User } from '../entities/user.entity';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(25)
    public readonly firstName: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(25)
    public readonly lastName: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 40)
    public readonly password: string;

    @IsNotEmpty()
    @IsEmail()
    @Validate(UniqueEntity, [User, 'email'])
    public readonly email: string;

    @IsNotEmpty()
    @IsString()
    public readonly birthdate: string;

    @IsOptional()
    @IsUrl()
    public readonly photoURL: string | null;

    @IsNotEmpty()
    @IsNumber()
    @Validate(EntityExists, [Team])
    public readonly teamId: number;
}
