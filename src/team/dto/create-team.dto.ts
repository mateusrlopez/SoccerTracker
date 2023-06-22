import { IsNotEmpty } from 'class-validator';

export interface ICreateTeam {
    name: string;
    country: string;
    foundationDate: Date;
    stadiumId: string;
}

export class CreateTeamDto implements ICreateTeam {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    country: string;

    @IsNotEmpty()
    foundationDate: Date;

    @IsNotEmpty()
    stadiumId: string;
}
