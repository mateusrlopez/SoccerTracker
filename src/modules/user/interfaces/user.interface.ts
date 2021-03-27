import { DateTime } from 'luxon';

import { IBaseEntity } from '@shared/base-entity.interface';

export interface IUser extends IBaseEntity {
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    emailVerified: boolean;
    password: string;
    birthdate: DateTime;
    age: number;
    admin: boolean;
    bio: string;
    photoURL: string;
    teamId: number;
}
