import { IsNotEmpty, IsPositive } from 'class-validator';

export interface ICreateMatch {
    date: Date;
    stadiumId: string;
    homeTeamId: string;
    homeTeamScore: number;
    awayTeamId: string;
    awayTeamScore: number;
}

export class CreateMatchDto implements ICreateMatch {
    @IsNotEmpty()
    date: Date;

    @IsNotEmpty()
    stadiumId: string;

    @IsNotEmpty()
    homeTeamId: string;

    @IsNotEmpty()
    @IsPositive()
    homeTeamScore: number;

    @IsNotEmpty()
    awayTeamId: string;

    @IsNotEmpty()
    @IsPositive()
    awayTeamScore: number;
}
