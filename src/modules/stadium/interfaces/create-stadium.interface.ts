import { DateTime } from 'luxon';

export interface ICreateStadium {
    name: string;
    knownby: string;
    foundationDate: DateTime;
    capacity: number;
    pictureURL?: string;
}
