import { Module } from '@nestjs/common';
import { MatchController } from './match.controller';
import { DatabaseModule } from '../database/database.module';
import { MatchRepositoryProvider, MatchServiceProvider } from './match.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [MatchController],
    providers: [MatchRepositoryProvider, MatchServiceProvider],
})
export class MatchModule {}
