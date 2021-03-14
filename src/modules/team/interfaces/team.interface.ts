import { Dayjs } from 'dayjs';

export interface ITeam {
    id: number;
    name: string;
    knownby: string;
    initials: string;
    logoURL: string;
    stadiumId: number;
    foundationDate: Dayjs;
    createdAt: Dayjs;
    updatedAt: Dayjs;
}
