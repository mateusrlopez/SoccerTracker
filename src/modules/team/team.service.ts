import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ICreateTeam } from './interfaces/create-team.interface';
import { ITeam } from './interfaces/team.interface';
import { IUpdateTeam } from './interfaces/update-team.interface';
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
        const team = await this.teamRepository.findOne(id);

        if (throwException && typeof team === 'undefined') {
            throw new NotFoundException(`Team with id ${id} not found`);
        }

        return team;
    }

    public async updateById(id: number, updateTeamDto: IUpdateTeam): Promise<ITeam> {
        const team = await this.findById(id);

        return this.teamRepository.save({ ...team, ...updateTeamDto });
    }

    public async remove(id: number): Promise<void> {
        const team = await this.findById(id);

        await this.teamRepository.remove(team);
    }
}
