import { Dayjs } from "dayjs";

import { IUser } from "@user/interfaces/user.interface";

export interface IPasswordReset {
    email: string;
    token: string;
    createdAt: Dayjs;
    user: IUser;
}
