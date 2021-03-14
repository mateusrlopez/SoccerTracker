import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UpdateTeamDto } from './dto/update-team.dto';
import { ICreateTeam } from './interfaces/create-team.interface';
import { ITeam } from './interfaces/team.interface';
import { TeamRepository } from './repository/team.repository';

@Injectable()
export class TeamService {
    constructor(
        @InjectRepository(TeamRepository) private readonly teamRepository: TeamRepository
    ) {}

    public async create(createTeamDto: ICreateTeam): Promise<ITeam> {
        return this.teamRepository.save(createTeamDto);
    }

    public async findAll(): Promise<ITeam[]> {
        return this.teamRepository.find();
    }

    public async findById(id: number, throwException = true): Promise<ITeam> {
        const team = this.teamRepository.findOne(id);

        if (throwException && typeof team === 'undefined') {
            throw new NotFoundException(`Team with id ${id} not found`);
        }

        return team;
    }

    public async updateById(id: number, updateTeamDto: UpdateTeamDto): Promise<ITeam> {
        const team = await this.findById(id);

        return this.teamRepository.save(Object.assign(team, updateTeamDto));
    }

    public async remove(id: number): Promise<void> {
        const team = await this.findById(id);

        await this.teamRepository.remove(team);
    }
}
