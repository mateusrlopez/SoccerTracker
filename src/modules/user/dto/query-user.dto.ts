import { IsNumber } from 'class-validator';

export class QueryUserDto {
    @IsNumber()
    public readonly teamId?: number;
}
