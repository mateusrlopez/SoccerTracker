import { DateTime } from 'luxon';

export interface ICreateStadium {
    name: string;
    knownby: string;
    foundationDate: DateTime;
    pictureURL?: string;
    address: string;
    capacity: number;
    bio?: string;
}
