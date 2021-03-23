import { DateTime } from 'luxon';

export interface IBaseEntity {
    id: number;
    createdAt: DateTime;
    updatedAt: DateTime | null;
}
