import { Dayjs } from 'dayjs';

import { Position } from '@shared/enums/poisition.enum';
import { PreferredFoot } from '@shared/enums/preferred-foot.enum';

export interface IPlayer {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    knownby: string;
    pictureURL: string | null;
    height: number;
    shirtNumber: number | null;
    position: Position;
    preferredFoot: PreferredFoot;
    birthdate: Dayjs;
    age: number;
    createdAt: Dayjs;
    updatedAt: Dayjs;
}
