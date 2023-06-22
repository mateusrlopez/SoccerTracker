import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TeamController } from './team.controller';
import { TeamRepositoryProvider, TeamServiceProvider } from './team.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [TeamController],
    providers: [TeamRepositoryProvider, TeamServiceProvider],
})
export class TeamModule {}
