import { DateTime } from 'luxon';

import { IBaseEntity } from '@shared/base-entity.interface';

export interface IMatch extends IBaseEntity {
    datetime: DateTime;
    totalPublic: number;
    homeTeamId: number;
    awayTeamId: number;
    stadiumId: number;
}
