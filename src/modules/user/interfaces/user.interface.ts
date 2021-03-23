import { Dayjs } from 'dayjs';

import { IBaseEntity } from '@shared/base-entity.interface';

export interface IUser extends IBaseEntity {
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
}
