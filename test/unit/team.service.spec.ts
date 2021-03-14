import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { createTeamPayload, updateTeamPayload } from '@factories/team.factory';
import { mockTeamRepository } from '@mocks/repositories/team.repository.mock';
import { TeamRepository } from '@team/repository/team.repository';
import { TeamService } from '@team/team.service';

describe('TeamService', () => {
    let teamService: TeamService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                TeamService,
                {
                    provide: getRepositoryToken(TeamRepository),
                    useValue: mockTeamRepository,
                },
            ],
        }).compile();

        teamService = moduleRef.get<TeamService>(TeamService);
    });

    it('should be defined', () => {
        expect(teamService).toBeDefined();
    });

    describe('create', () => {
        it('should return created team', async () => {
            const team = createTeamPayload;
            const createdTeam = await teamService.create(team);

            expect(createdTeam).toMatchObject(team);
            expect(mockTeamRepository.save).toHaveBeenCalledTimes(1);
        });
    });

    describe('findAll', () => {
        it('should return all teams', async () => {
            const teams = await teamService.findAll();

            expect(teams).toHaveLength(4);
            expect(mockTeamRepository.find).toHaveBeenCalledTimes(1);
        });
    });

    describe('findById', () => {
        it('should return a team by id', async () => {
            const team = await teamService.findById(1);

            expect(team).toMatchObject({ id: 1 });
            expect(mockTeamRepository.findOne).toHaveBeenCalledTimes(1);
        });

        it('should throw an error on team not found', () => {
            expect(teamService.findById(-1)).rejects.toBeInstanceOf(NotFoundException);
            expect(mockTeamRepository.findOne).toHaveBeenCalledTimes(1);
        });
    });

    describe('updateById', () => {
        it('should return updated team by id', async () => {
            const team = updateTeamPayload;
            const updatedTeam = await teamService.updateById(1, team);

            expect(updatedTeam).toMatchObject(team);
            expect(mockTeamRepository.findOne).toHaveBeenCalledTimes(1);
            expect(mockTeamRepository.save).toHaveBeenCalledTimes(1);
        });

        it('should throw an error on team not found', () => {
            expect(teamService.updateById(-1, {})).rejects.toBeInstanceOf(NotFoundException);
            expect(mockTeamRepository.findOne).toHaveBeenCalledTimes(1);
            expect(mockTeamRepository.save).toHaveBeenCalledTimes(0);
        });
    });

    describe('remove', () => {
        it('should return undefined', async () => {
            const result = await teamService.remove(1);

            expect(result).not.toBeDefined();
            expect(mockTeamRepository.findOne).toHaveBeenCalledTimes(1);
            expect(mockTeamRepository.remove).toHaveBeenCalledTimes(1);
        });

        it('should throw an error on team not found', () => {
            expect(teamService.remove(-1)).rejects.toBeInstanceOf(NotFoundException);
            expect(mockTeamRepository.findOne).toHaveBeenCalledTimes(1);
            expect(mockTeamRepository.remove).toHaveBeenCalledTimes(0);
        });
    });
});
