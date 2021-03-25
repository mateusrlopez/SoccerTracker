import { DateTime } from 'luxon';

export interface ICreateTeam {
    name: string;
    knownby: string;
    initials: string;
    logoURL?: string;
    stadiumId: number;
    foundationDate: DateTime;
}
