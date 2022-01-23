import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Post, Put, Query } from '@nestjs/common';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';

import { UseCaseProxy } from '@app/usecases/common/usecase.proxy';
import { CreateTeamUseCase } from '@app/usecases/team/create-team.usecase';
import { DeleteTeamByIdUseCase } from '@app/usecases/team/delete-team-by-id.usecase';
import { FindAllTeamUseCase } from '@app/usecases/team/find-all-team.usecase';
import { FindTeamByIdUseCase } from '@app/usecases/team/find-team-by-id.usecase';
import { UpdateTeamByIdUseCase } from '@app/usecases/team/update-team-by-id.usecase';
import { TeamDITokens } from '@infra/di/team.di';

import { CreateTeamDto } from '../dtos/team/create-team.dto';
import { FindAllTeamDto } from '../dtos/team/find-all-team.dto';
import { TeamDto } from '../dtos/team/team.dto';
import { UpdateTeamDto } from '../dtos/team/update-team-dto';

@ApiTags('teams')
@Controller('teams')
export class TeamController {
    constructor(
        @Inject(TeamDITokens.CreateUseCaseToken)
        private readonly createTeamUseCase: UseCaseProxy<CreateTeamUseCase>,
        @Inject(TeamDITokens.FindByIdUseCaseToken)
        private readonly findTeamByIdUseCase: UseCaseProxy<FindTeamByIdUseCase>,
        @Inject(TeamDITokens.FindAllUseCaseToken)
        private readonly findAllTeamUseCase: UseCaseProxy<FindAllTeamUseCase>,
        @Inject(TeamDITokens.UpdateByIdUseCaseToken)
        private readonly updateTeamByIdUseCase: UseCaseProxy<UpdateTeamByIdUseCase>,
        @Inject(TeamDITokens.DeleteByIdUseCaseToken)
        private readonly deleteTeamByIdUseCase: UseCaseProxy<DeleteTeamByIdUseCase>
    ) {}

    @Get('/')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Find all teams',
    })
    @ApiQuery({
        description: 'Query parameters to filter fetched teams',
        type: FindAllTeamDto,
    })
    @ApiOkResponse({ description: 'All fetched teams', type: TeamDto, isArray: true })
    public async index(@Query() findAllTeamDto: FindAllTeamDto): Promise<TeamDto[]> {
        const models = await this.findAllTeamUseCase.getInstance().handle(findAllTeamDto);
        return TeamDto.fromListOfModels(models);
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Find a team by id',
    })
    @ApiParam({ name: 'id', type: Number, description: 'ID of the team' })
    @ApiOkResponse({
        description: 'Retrieved team',
        type: TeamDto,
    })
    public async findById(@Param('id') id: string): Promise<TeamDto> {
        const model = await this.findTeamByIdUseCase.getInstance().handle(id);
        return TeamDto.fromModel(model);
    }

    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: 'Create a team',
    })
    @ApiBody({
        description: 'Data to create a team',
        type: CreateTeamDto,
    })
    @ApiCreatedResponse({ description: 'Created team', type: TeamDto })
    public async create(@Body() createTeamDto: CreateTeamDto): Promise<TeamDto> {
        const model = await this.createTeamUseCase.getInstance().handle(createTeamDto);
        return TeamDto.fromModel(model);
    }

    @Put('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Update a team by id',
    })
    @ApiParam({ name: 'id', type: Number, description: 'ID of the team' })
    @ApiBody({
        description: 'Data to update a team',
        type: UpdateTeamDto,
    })
    @ApiOkResponse({
        description: 'Updated team',
        type: TeamDto,
    })
    public async updateById(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto): Promise<TeamDto> {
        const model = await this.updateTeamByIdUseCase.getInstance().handle(id, updateTeamDto);
        return TeamDto.fromModel(model);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Delete a team',
    })
    @ApiParam({ name: 'id', type: Number, description: 'ID of the team' })
    @ApiNoContentResponse()
    public async deleteById(@Param('id') id: string): Promise<void> {
        return this.deleteTeamByIdUseCase.getInstance().handle(id);
    }
}
