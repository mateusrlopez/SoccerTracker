import { IsNumber, IsOptional, Validate } from 'class-validator';

import { EntityExists } from '@shared/validators/entity-exists.validator';
import { Team } from '@team/entities/team.entity';

export class QueryUserDto {
    @IsOptional()
    @IsNumber()
    @Validate(EntityExists, [Team])
    public readonly teamId?: number;
}
