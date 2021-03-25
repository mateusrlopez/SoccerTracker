import { DateTime } from 'luxon';

export interface ICreateManager {
    firstName: string;
    middleName: string;
    lastName: string;
    pictureURL?: string;
    birthdate: DateTime;
    teamId?: number;
}
