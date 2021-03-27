import { DateTime } from 'luxon';

import { Function } from '@footballer/enums/function.enum';

import { Position } from '../enums/position.enum';
import { PreferredFoot } from '../enums/preferred-foot.enum';

export interface ICreateFootballer {
    firstName: string;
    middleName: string;
    lastName: string;
    knownby: string;
    birthdate: DateTime;
    height: number;
    weight: number;
    position: Position;
    preferredFoot: PreferredFoot;
    function: Function;
    pictureURL?: string;
    bio?: string;
    shirtNumber?: number;
    teamId?: number;
}
