import { Dayjs } from 'dayjs';

import { IBaseEntity } from '@shared/base-entity.interface';

export interface IStadium extends IBaseEntity {
    name: string;
    knownby: string;
    pictureURL: string;
    foundationDate: Dayjs;
    capacity: number;
}
