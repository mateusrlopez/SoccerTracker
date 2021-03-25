import { DateTime } from 'luxon';

export interface ICreateUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    birthdate: DateTime;
    photoURL?: string;
    teamId: number;
}
