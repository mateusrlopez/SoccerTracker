import { IStadium } from '../../stadium/entities/stadium.entity';

export interface ITeam {
    id: string;
    name: string;
    country: string;
    foundationDate: Date;
    stadium: IStadium;
}
