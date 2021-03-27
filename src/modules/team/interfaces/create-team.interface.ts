import { DateTime } from 'luxon';

export interface ICreateTeam {
    name: string;
    knownby: string;
    initials: string;
    foundationDate: DateTime;
    logoURL?: string;
    bio?: string;
    stadiumId: number;
}
