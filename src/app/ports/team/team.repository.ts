import { IFindAllTeamData } from '@domain/data/team/find-all-team.data';
import { IFindOneTeamData } from '@domain/data/team/find-one-team.data';
import { ITeamModel, TeamModel } from '@domain/models/team.model';

export interface ITeamRepository {
    save(model: ITeamModel): Promise<TeamModel>;
    findOne(by: IFindOneTeamData): Promise<TeamModel>;
    findAll(by: IFindAllTeamData): Promise<TeamModel[]>;
    delete(model: ITeamModel): Promise<void>;
}
