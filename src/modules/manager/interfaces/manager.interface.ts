import { DateTime } from 'luxon';

import { IBaseEntity } from '@shared/base-entity.interface';

export interface IManager extends IBaseEntity {
    firstName: string;
    middleName: string;
    lastName: string;
    birthdate: DateTime;
    age: number;
    pictureURL: string | null;
    teamId: number | null;
}
