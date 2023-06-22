import { IStadium } from '../../stadiums/entities/stadium.entity';

interface ITeam {
    id: string;
    name: string;
    country: string;
    foundationDate: Date;
}

export interface IMatch {
    id: string;
    date: Date;
    stadium: IStadium;
    homeTeam: ITeam;
    homeTeamScore: number;
    awayTeam: ITeam;
    awayTeamScore: number;
}
