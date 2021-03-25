import { DateTime } from 'luxon';

import { Position } from '../enums/poisition.enum';
import { PreferredFoot } from '../enums/preferred-foot.enum';

export interface ICreatePlayer {
    firstName: string;
    middleName: string;
    lastName: string;
    knownby: string;
    pictureURL?: string;
    shirtNumber?: number;
    position: Position;
    preferredFoot: PreferredFoot;
    height: number;
    birthdate: DateTime;
}
