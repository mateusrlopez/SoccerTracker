import { DateTime } from 'luxon';

import { IBaseEntity } from '@shared/base-entity.interface';

export interface ITeam extends IBaseEntity {
    name: string;
    knownby: string;
    initials: string;
    foundationDate: DateTime;
    logoURL: string;
    bio: string;
    stadiumId: number;
}
