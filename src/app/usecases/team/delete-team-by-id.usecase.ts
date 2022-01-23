import { ITeamRepository } from '@app/ports/team/team.repository';
import { TeamNotExistsException } from '@domain/exceptions/team/team-not-exists.exception';

export class DeleteTeamByIdUseCase {
    constructor(private readonly repository: ITeamRepository) {}

    public async handle(id: string): Promise<void> {
        const team = await this.repository.findOne({ id });

        if (!team) {
            throw new TeamNotExistsException(`Team with id ${id} not exists`);
        }

        return this.repository.delete(team);
    }
}
