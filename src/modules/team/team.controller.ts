import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';

import { AdminGuard } from '@shared/admin.guard';

import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { ITeam } from './interfaces/team.interface';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
    constructor(private readonly teamService: TeamService) {}

    @Post()
    @UseGuards(AdminGuard)
    @HttpCode(HttpStatus.CREATED)
    public async create(@Body() createUserDto: CreateTeamDto): Promise<ITeam> {
        return this.teamService.create(createUserDto);
    }

    @Get()
    public async findAll(): Promise<ITeam[]> {
        return this.teamService.findAll();
    }

    @Get(':id')
    public async findOne(@Param('id', ParseIntPipe) id: number): Promise<ITeam> {
        return this.teamService.findById(id);
    }

    @Put(':id')
    @UseGuards(AdminGuard)
    public async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTeamDto: UpdateTeamDto
    ): Promise<ITeam> {
        return this.teamService.updateById(id, updateTeamDto);
    }

    @Delete(':id')
    @UseGuards(AdminGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    public async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.teamService.remove(id);
    }
}
