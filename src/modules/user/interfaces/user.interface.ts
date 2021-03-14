import { Dayjs } from 'dayjs';

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    emailVerified: boolean;
    password: string;
    birthdate: Dayjs;
    age: number;
    photoURL: string | null;
    teamId: number;
    admin: boolean;
    createdAt: Dayjs;
    updatedAt: Dayjs;
}
