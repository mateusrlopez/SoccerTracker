import { EntityManager, EntityRepository } from 'typeorm';

import { ITeamRepository } from '@app/ports/team/team.repository';
import { IFindAllTeamData } from '@domain/data/team/find-all-team.data';
import { IFindOneTeamData } from '@domain/data/team/find-one-team.data';
import { ITeamModel, TeamModel } from '@domain/models/team.model';
import { TeamEntity } from '@infra/entities/team.entity';

@EntityRepository(TeamEntity)
export class TypeOrmTeamRepository implements ITeamRepository {
    constructor(private manager: EntityManager) {}

    public async save(model: ITeamModel): Promise<TeamModel> {
        const entity = this.manager.create(TeamEntity, model);
        const savedEntity = await this.manager.save(entity);
        return savedEntity.toModel();
    }

    public async findOne(by: IFindOneTeamData): Promise<TeamModel> {
        const entity = this.manager.create(TeamEntity, by);
        const searchedEntity = await this.manager.findOne(TeamEntity, entity);
        return searchedEntity?.toModel();
    }

    public async findAll(by: IFindAllTeamData): Promise<TeamModel[]> {
        const entity = this.manager.create(TeamEntity, by);
        const searchedEntities = await this.manager.find(TeamEntity, entity);
        return searchedEntities.map(searchedEntity => searchedEntity.toModel());
    }

    public async delete(model: ITeamModel): Promise<void> {
        const entity = this.manager.create(TeamEntity, model);
        await this.manager.delete(TeamEntity, entity);
    }
}
