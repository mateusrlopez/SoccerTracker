import { IsEmail, IsNotEmpty, Validate } from 'class-validator';

import { EntityExists } from '@shared/validators/entity-exists.validator';
import { User } from '@user/entities/user.entity';

export class RequestPasswordResetDto {
    @IsNotEmpty()
    @IsEmail()
    @Validate(EntityExists, [User, 'email'])
    public readonly userEmail: string;
}
