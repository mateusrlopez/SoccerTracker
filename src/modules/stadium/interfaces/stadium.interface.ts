import { DateTime } from 'luxon';

import { IBaseEntity } from '@shared/base-entity.interface';

export interface IStadium extends IBaseEntity {
    name: string;
    knownby: string;
    pictureURL: string | null;
    foundationDate: DateTime;
    capacity: number;
}
