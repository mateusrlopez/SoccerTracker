import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';

import { ITeamModel, TeamModel } from '@domain/models/team.model';

export class TeamDto implements ITeamModel {
    @Expose()
    @ApiProperty({ example: '469ea0de-5888-41e7-a1ce-48aba5215967', description: 'The ID of the team' })
    public readonly id: string;

    @Expose()
    @ApiProperty({ example: 'Fluminense', description: 'The name of the team' })
    public readonly name: string;

    @Expose()
    @ApiProperty({ example: 'FLU', description: 'The initials of the team' })
    public readonly initials: string;

    @Expose()
    @ApiProperty({ example: new Date('1902-07-19'), description: 'The foundation date of the team' })
    public readonly foundationDate: Date;

    @Expose()
    @ApiProperty({
        example: 'teams-logo/13357d187dedf3541cf4-fluminense.png',
        description: "The key of the team's image file in the file storage",
    })
    public readonly logoFileKey: string;

    @Expose()
    @ApiProperty({
        example:
            'Fluminense Football Club, known simply as Fluminense, is a Brazilian sports club best known for its professional football team that competes in the Campeonato Brasileiro Série A, the first tier of Brazilian football and the Campeonato Carioca, the state league of Rio de Janeiro.',
        description: 'The biography of the team',
    })
    public readonly bio: string;

    @Expose()
    @ApiProperty({
        example: '469ea0de-5888-41e7-a1ce-48aba5215967',
        description: 'The ID of the related stadium',
    })
    public readonly stadiumId: string;

    @Expose()
    @ApiProperty({ example: '2021-07-19T15:32:00Z', description: 'The created date of the team' })
    public readonly createdAt: Date;

    @Expose()
    @ApiProperty({ example: '2021-07-19T15:32:00Z', description: 'The last update date of the team' })
    public readonly updatedAt: Date;

    public static fromModel(model: TeamModel): TeamDto {
        return plainToClass(TeamDto, model);
    }

    public static fromListOfModels(models: TeamModel[]): TeamDto[] {
        return models.map(model => this.fromModel(model));
    }
}
