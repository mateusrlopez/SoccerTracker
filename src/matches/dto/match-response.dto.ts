import { StadiumResponseDto } from '../../stadiums/dto/stadium-response.dto';

class TeamResponseDto {
    id: string;

    name: string;

    country: string;

    foundationDate: Date;
}

export class MatchResponseDto {
    id: string;

    date: Date;

    stadium: StadiumResponseDto;

    homeTeam: TeamResponseDto;

    homeTeamScore: number;

    awayTeam: TeamResponseDto;

    awayTeamScore: number;
}
