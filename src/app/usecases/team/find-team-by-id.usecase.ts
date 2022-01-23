import { ITeamRepository } from '@app/ports/team/team.repository';
import { TeamNotExistsException } from '@domain/exceptions/team/team-not-exists.exception';
import { TeamModel } from '@domain/models/team.model';

export class FindTeamByIdUseCase {
    constructor(private readonly repository: ITeamRepository) {}

    public async handle(id: string): Promise<TeamModel> {
        const team = await this.repository.findOne({ id });

        if (!team) {
            throw new TeamNotExistsException(`Team with id ${id} not exists`);
        }

        return team;
    }
}
