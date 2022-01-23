import { ITeamFileUploader } from '@app/ports/team/team.file-uploader';
import { ITeamRepository } from '@app/ports/team/team.repository';
import { IUpdateTeamData } from '@domain/data/team/update-team.data';
import { TeamNotExistsException } from '@domain/exceptions/team/team-not-exists.exception';
import { ITeamModel, TeamModel } from '@domain/models/team.model';

export class UpdateTeamByIdUseCase {
    constructor(private readonly repository: ITeamRepository, private readonly fileUploader: ITeamFileUploader) {}

    public async handle(id: string, data: IUpdateTeamData): Promise<TeamModel> {
        const team = await this.repository.findOne({ id });

        if (!team) {
            throw new TeamNotExistsException(`Team with id ${id} not exists`);
        }

        let logoFileKey = team.logoFileKey;

        if (data.logo) {
            logoFileKey = await this.fileUploader.uploadTeamLogo(data.name, data.logo);
        }

        const updateData: ITeamModel = {
            id: team.id,
            name: data.name,
            initials: data.initials,
            foundationDate: data.foundationDate,
            logoFileKey,
            bio: data.bio,
            stadiumId: data.stadiumId,
            createdAt: team.createdAt,
        };

        return this.repository.save(updateData);
    }
}
