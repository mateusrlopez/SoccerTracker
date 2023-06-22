import { Inject, Injectable } from '@nestjs/common';
import { ICreateTeam } from './dto/create-team.dto';
import { IUpdateTeam } from './dto/update-team.dto';
import { ITeamRepository } from './team.repository';
import { ITeam } from './entities/team.entity';
import { TeamExistsException } from './exceptions/exists.exception';
import { TeamNotExistsException } from './exceptions/not-exists.exception';

export interface ITeamService {
    create(data: ICreateTeam): Promise<ITeam>;
    findAll(): Promise<Array<ITeam>>;
    findOneById(id: string): Promise<ITeam>;
    updateOneById(id: string, data: IUpdateTeam): Promise<ITeam>;
    removeOneById(id: string): Promise<void>;
}

@Injectable()
export class TeamServiceImplementation implements ITeamService {
    constructor(@Inject('TEAM_REPOSITORY') private readonly teamRepository: ITeamRepository) {}

    async create(createTeamDto: ICreateTeam): Promise<ITeam> {
        const team = await this.teamRepository.findOneByName(createTeamDto.name);

        if (team) {
            throw new TeamExistsException(`Team with name: ${createTeamDto.name} already exists`);
        }

        return this.teamRepository.create(createTeamDto);
    }

    findAll(): Promise<Array<ITeam>> {
        return this.teamRepository.findMany();
    }

    async findOneById(id: string) {
        const team = await this.teamRepository.findOneById(id);

        if (!team) {
            throw new TeamNotExistsException(`Team with given id: ${id} does not exists`);
        }

        return team;
    }

    updateOneById(id: string, updateTeamDto: IUpdateTeam) {
        return this.teamRepository.updateOneById(id, updateTeamDto);
    }

    async removeOneById(id: string) {
        await this.teamRepository.deleteOneById(id);
    }
}
