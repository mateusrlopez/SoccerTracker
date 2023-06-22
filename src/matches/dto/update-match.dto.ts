import { IsNotEmpty, IsPositive } from 'class-validator';

export interface IUpdateMatch {
    date: Date;
    stadiumId: string;
    homeTeamId: string;
    homeTeamScore: number;
    awayTeamId: string;
    awayTeamScore: number;
}

export class UpdateMatchDto implements IUpdateMatch {
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
