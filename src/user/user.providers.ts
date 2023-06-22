import { Provider } from '@nestjs/common';
import { PrismaUserRepository } from './user.repository';
import { UserServiceImplementation } from './user.service';

export const UserServiceProvider: Provider = {
    provide: 'USER_SERVICE',
    useClass: UserServiceImplementation,
};

export const UserRepositoryProvider: Provider = {
    provide: 'USER_REPOSITORY',
    useClass: PrismaUserRepository,
};
