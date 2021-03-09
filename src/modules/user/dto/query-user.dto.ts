import { IsNumber, IsOptional } from 'class-validator';

import { TeamExists } from '@team/validators/team-exists.validator';

export class QueryUserDto {
    @IsOptional()
    @IsNumber()
    @TeamExists()
    public readonly teamId?: number;
}
