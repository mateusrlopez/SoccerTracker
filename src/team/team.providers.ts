import { Provider } from '@nestjs/common';
import { PrismaTeamRepository } from './team.repository';
import { TeamServiceImplementation } from './team.service';

export const TeamRepositoryProvider: Provider = {
    provide: 'TEAM_REPOSITORY',
    useClass: PrismaTeamRepository,
};

export const TeamServiceProvider: Provider = {
    provide: 'TEAM_SERVICE',
    useClass: TeamServiceImplementation,
};
