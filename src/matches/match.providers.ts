import { Provider } from '@nestjs/common';
import { PrismaMatchRepository } from './match.repository';
import { MatchServiceImplementation } from './match.service';

export const MatchRepositoryProvider: Provider = {
    provide: 'MATCH_REPOSITORY',
    useClass: PrismaMatchRepository,
};

export const MatchServiceProvider: Provider = {
    provide: 'MATCH_SERVICE',
    useClass: MatchServiceImplementation,
};
