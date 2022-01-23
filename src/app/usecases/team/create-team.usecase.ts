import { ITeamFileUploader } from '@app/ports/team/team.file-uploader';
import { ITeamRepository } from '@app/ports/team/team.repository';
import { ICreateTeamData } from '@domain/data/team/create-team.data';
import { TeamExistsException } from '@domain/exceptions/team/team-exists.exception';
import { ITeamModel, TeamModel } from '@domain/models/team.model';

export class CreateTeamUseCase {
    constructor(private readonly repository: ITeamRepository, private readonly fileUploader: ITeamFileUploader) {}

    public async handle(data: ICreateTeamData): Promise<TeamModel> {
        const team = await this.repository.findOne({ name: data.name });

        if (team) {
            throw new TeamExistsException(`Team with name ${data.name} already exists`);
        }

        let logoFileKey = null;

        if (data.logo) {
            logoFileKey = await this.fileUploader.uploadTeamLogo(data.name, data.logo);
        }

        const createData: ITeamModel = {
            name: data.name,
            initials: data.initials,
            foundationDate: data.foundationDate,
            logoFileKey,
            bio: data.bio,
            stadiumId: data.stadiumId,
        };

        return this.repository.save(createData);
    }
}
