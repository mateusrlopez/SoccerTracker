import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDataURI, IsDefined, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

import { IUpdateTeamData } from '@domain/data/team/update-team.data';

export class UpdateTeamDto implements IUpdateTeamData {
    @IsDefined()
    @IsString()
    @ApiProperty({ required: true, example: 'Fluminense', description: 'The name of the team' })
    public readonly name: string;

    @IsDefined()
    @IsString()
    @MaxLength(3)
    @ApiProperty({ required: true, example: 'FLU', description: 'The initials of the team' })
    public readonly initials: string;

    @IsDefined()
    @Transform(({ value }) => new Date(value))
    @ApiProperty({ required: true, example: new Date('1902-07-21'), description: 'The foundation date of the team' })
    public readonly foundationDate: Date;

    @IsOptional()
    @IsDataURI()
    @ApiProperty({
        required: false,
        example:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAADIAAAA5YCAYAAABndhYTAAAABmJLR0QA/wD/AP+gvaeTAAAgAElEQVR4nOzdaZiddYHn/d99Tm2nklS2SkLYErJUVUhYBAG',
        description: "The logo's file of the team encrypted in data uri format",
    })
    public readonly logo: string;

    @IsOptional()
    @IsString()
    @ApiProperty({
        required: false,
        example:
            'Fluminense Football Club, known simply as Fluminense, is a Brazilian sports club best known for its professional football team that competes in the Campeonato Brasileiro Série A, the first tier of Brazilian football and the Campeonato Carioca, the state league of Rio de Janeiro.',
        description: 'The biography of the team',
    })
    public readonly bio: string;

    @IsOptional()
    @IsUUID()
    @ApiProperty({
        required: true,
        example: '469ea0de-5888-41e7-a1ce-48aba5215967',
        description: 'The ID of the related stadium',
    })
    public readonly stadiumId: string;
}
