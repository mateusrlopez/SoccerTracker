import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

import { IFindAllTeamData } from '@domain/data/team/find-all-team.data';

export class FindAllTeamDto implements IFindAllTeamData {
    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, example: 'Fluminense', description: 'The name of the team' })
    public readonly name?: string;

    @IsOptional()
    @IsUUID()
    @ApiProperty({
        required: false,
        example: '469ea0de-5888-41e7-a1ce-48aba5215967',
        description: 'The ID of the related stadium',
    })
    public readonly stadiumId?: string;
}
