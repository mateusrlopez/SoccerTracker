import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StadiumModule } from '@stadium/stadium.module';

import { TeamRepository } from './repository/team.repository';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';

@Module({
    controllers: [TeamController],
    exports: [TeamService],
    imports: [TypeOrmModule.forFeature([TeamRepository]), StadiumModule],
    providers: [TeamService],
})
export class TeamModule {}
