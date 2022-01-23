import { ITeamRepository } from '@app/ports/team/team.repository';
import { IFindAllTeamData } from '@domain/data/team/find-all-team.data';
import { TeamModel } from '@domain/models/team.model';

export class FindAllTeamUseCase {
    constructor(private readonly repository: ITeamRepository) {}

    public async handle(by: IFindAllTeamData): Promise<TeamModel[]> {
        return this.repository.findAll(by);
    }
}
