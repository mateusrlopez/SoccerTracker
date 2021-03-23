import { DateTime } from 'luxon';

import { IBaseEntity } from '@shared/base-entity.interface';

import { Position } from '../enums/poisition.enum';
import { PreferredFoot } from '../enums/preferred-foot.enum';

export interface IPlayer extends IBaseEntity {
    firstName: string;
    middleName: string;
    lastName: string;
    knownby: string;
    pictureURL: string | null;
    height: number;
    teamId: number | null;
    shirtNumber: number | null;
    position: Position;
    preferredFoot: PreferredFoot;
    birthdate: DateTime;
    age: number;
}
