import { Dayjs } from 'dayjs';

import { IUser } from '@user/interfaces/user.interface';

export interface IPasswordReset {
    userEmail: string;
    token: string;
    createdAt: Dayjs;
    user: IUser;
}
