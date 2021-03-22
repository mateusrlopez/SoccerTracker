import { IsDefined, IsEmail, Validate } from 'class-validator';

import { EntityExists } from '@shared/validators/entity-exists.validator';
import { User } from '@user/entities/user.entity';

export class RequestPasswordResetDto {
    @IsDefined()
    @IsEmail()
    @Validate(EntityExists, [User, 'email'])
    public readonly userEmail: string;
}
