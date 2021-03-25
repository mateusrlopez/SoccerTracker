import { EntityRepository, Repository } from 'typeorm';

import { ICreateTeam } from '@team/interfaces/create-team.interface';
import { ITeam } from '@team/interfaces/team.interface';

import { Team } from '../entities/team.entity';

@EntityRepository(Team)
export class TeamRepository extends Repository<Team> {
    public createAndSave(createTeamDto: ICreateTeam): Promise<ITeam> {
        const entity = this.create(createTeamDto);
        return this.save(entity);
    }
}
