import { Provider } from '@nestjs/common';
import { StadiumServiceImplementation } from './stadium.service';
import { PrismaStadiumRepository } from './stadium.repository';

export const StadiumServiceProvider: Provider = {
    provide: 'STADIUM_SERVICE',
    useClass: StadiumServiceImplementation,
};

export const StadiumRepositoryProvider: Provider = {
    provide: 'STADIUM_REPOSITORY',
    useClass: PrismaStadiumRepository,
};
