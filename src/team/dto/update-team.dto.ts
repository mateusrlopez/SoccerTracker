import { IsNotEmpty } from 'class-validator';

export interface IUpdateTeam {
    name: string;
    country: string;
    foundationDate: Date;
    stadiumId: string;
}

export class UpdateTeamDto implements IUpdateTeam {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    country: string;

    @IsNotEmpty()
    foundationDate: Date;

    @IsNotEmpty()
    stadiumId: string;
}
