import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Inject,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { ITeamService } from './team.service';
import { TeamResponseDto } from './dto/team-response.dto';

@Controller('teams')
export class TeamController {
    constructor(@Inject('TEAM_SERVICE') private readonly teamService: ITeamService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createTeamDto: CreateTeamDto): Promise<TeamResponseDto> {
        const team = await this.teamService.create(createTeamDto);

        return plainToInstance(TeamResponseDto, team);
    }

    @Get()
    async findAll(): Promise<Array<TeamResponseDto>> {
        const teams = await this.teamService.findAll();

        return plainToInstance(TeamResponseDto, teams);
    }

    @Get(':id')
    async findOneById(@Param('id') id: string): Promise<TeamResponseDto> {
        const team = await this.teamService.findOneById(id);

        return plainToInstance(TeamResponseDto, team);
    }

    @Patch(':id')
    async updateOneById(
        @Param('id') id: string,
        @Body() updateTeamDto: UpdateTeamDto
    ): Promise<TeamResponseDto> {
        const updated = await this.teamService.updateOneById(id, updateTeamDto);

        return plainToInstance(TeamResponseDto, updated);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async removeOneById(@Param('id') id: string): Promise<void> {
        await this.teamService.removeOneById(id);
    }
}
