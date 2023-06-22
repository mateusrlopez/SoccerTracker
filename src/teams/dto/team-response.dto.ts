import { StadiumResponseDto } from '../../stadiums/dto/stadium-response.dto';

export class TeamResponseDto {
    id: string;

    name: string;

    country: string;

    foundationDate: Date;

    stadium: StadiumResponseDto;
}
