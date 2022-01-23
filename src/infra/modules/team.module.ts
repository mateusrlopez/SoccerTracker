import { Module } from '@nestjs/common';

import { TeamProviders } from '@infra/providers/team.providers';
import { TeamController } from '@presenters/http/controllers/team.controller';

@Module({
    controllers: [TeamController],
    providers: [...TeamProviders],
})
export class TeamModule {}
