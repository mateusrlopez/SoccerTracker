import { DateTime } from 'luxon';

export interface IUpdateUser {
    firstName?: string;
    lastName?: string;
    password?: string;
    emailVerified?: boolean;
    birthdate?: DateTime;
    photoURL?: string;
    bio?: string;
    teamId?: number;
}
