import { StadiumResponseDto } from '../../stadium/dto/stadium-response.dto';

export class TeamResponseDto {
    id: string;

    name: string;

    country: string;

    foundationDate: Date;

    stadium: StadiumResponseDto;
}
