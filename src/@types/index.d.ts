import { IUser } from '@user/interfaces/user.interface';

declare global {
    namespace Express {
        /* eslint-disable @typescript-eslint/no-empty-interface, @typescript-eslint/naming-convention */
        interface User extends IUser {}
    }
}
