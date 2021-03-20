export interface IUpdateUser {
    firstName?: string;
    lastName?: string;
    password?: string;
    emailVerified?: boolean;
    birthdate?: string;
    photoURL?: string | null;
    teamId?: number | null;
}
