import { DateTime } from 'luxon';

export interface ICreateMatch {
    datetime: DateTime;
    totalPublic: number;
    homeTeamId: number;
    awayTeamId: number;
    stadiumId: number;
}
