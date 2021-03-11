import { IsNumber, IsOptional } from 'class-validator';

export class QueryUserDto {
    @IsOptional()
    @IsNumber()
    public readonly teamId?: number;
}
