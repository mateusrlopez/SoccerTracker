import { DateTime } from 'luxon';

import { IUser } from '@user/interfaces/user.interface';

export interface IPasswordReset {
    userEmail: string;
    token: string;
    createdAt: DateTime;
    user: IUser;
}
