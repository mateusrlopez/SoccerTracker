import { IsNumber } from 'class-validator';

import { IQueryUser } from '../interfaces/query-user.interface';

export class QueryUserDto implements IQueryUser {
    @IsNumber()
    public readonly teamId?: number;
}
