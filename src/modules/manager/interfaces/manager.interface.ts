import { Dayjs } from 'dayjs';

import { IBaseEntity } from '@shared/base-entity.interface';

export interface IManager extends IBaseEntity {
    firstName: string;
    middleName: string;
    lastName: string;
    birthdate: Dayjs;
    age: number;
    pictureURL: string | null;
    teamId: number | null;
}
