import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { TeamFactory } from '@factories/team.factory';
import { TeamRepositoryMock } from '@mocks/repositories/team.repository.mock';
import { ICreateTeam } from '@team/interfaces/create-team.interface';
import { ITeam } from '@team/interfaces/team.interface';
import { IUpdateTeam } from '@team/interfaces/update-team.interface';
import { TeamRepository } from '@team/repository/team.repository';
import { TeamService } from '@team/team.service';

describe('TeamService', () => {
    let teamService: TeamService;
    let teamRepository: TeamRepository;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                TeamService,
                {
                    provide: TeamRepository,
                    useClass: TeamRepositoryMock,
                },
            ],
        }).compile();

        teamService = moduleRef.get<TeamService>(TeamService);
        teamRepository = moduleRef.get<TeamRepository>(TeamRepository);
    });

    it('should be defined', () => {
        expect(teamService).toBeDefined();
    });

    describe('create', () => {
        it('should return the created team', async () => {
            const createTeamDto = await TeamFactory.attrs<ICreateTeam>('CreateTeamDto');
            const team = await TeamFactory.attrs<ITeam>('Team');

            const teamRepositorySaveSpy = jest
                .spyOn(teamRepository, 'save')
                .mockResolvedValue(team);

            const createdTeam = await teamService.create(createTeamDto);

            expect(createdTeam).toEqual(team);

            expect(teamRepositorySaveSpy).toHaveBeenCalledTimes(1);
            expect(teamRepositorySaveSpy).toHaveBeenCalledWith(createTeamDto);
        });
    });

    describe('findAll', () => {
        it('should return all teams', async () => {
            const teams = await TeamFactory.attrsMany<ITeam>('Team', 10);

            const teamRepositoryFindSpy = jest
                .spyOn(teamRepository, 'find')
                .mockResolvedValue(teams);

            const returnedTeams = await teamService.findAll();

            expect(returnedTeams).toEqual(teams);

            expect(teamRepositoryFindSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe('findById', () => {
        it('should return a team by id', async () => {
            const id = 1;
            const team = await TeamFactory.attrs<ITeam>('Team');

            const teamRepositoryFindByIdSpy = jest
                .spyOn(teamRepository, 'findOne')
                .mockResolvedValue(team);

            const returnedTeam = await teamService.findById(id);

            expect(returnedTeam).toEqual(team);

            expect(teamRepositoryFindByIdSpy).toHaveBeenCalledTimes(1);
            expect(teamRepositoryFindByIdSpy).toHaveBeenCalledWith(id);
        });

        it('should throw an error on team not found and flag enabled', async () => {
            const id = 1;

            const teamRepositoryFindByIdSpy = jest
                .spyOn(teamRepository, 'findOne')
                .mockResolvedValue(undefined);

            try {
                await teamService.findById(id);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect(error.message).toEqual(`Team with id ${id} not found`);
            } finally {
                expect(teamRepositoryFindByIdSpy).toHaveBeenCalledTimes(1);
                expect(teamRepositoryFindByIdSpy).toHaveBeenCalledWith(id);
            }
        });

        it("should't throw an error on team not found and flag disabled", async () => {
            const id = 1;

            const teamRepositoryFindByIdSpy = jest
                .spyOn(teamRepository, 'findOne')
                .mockResolvedValue(undefined);

            const returnedTeam = await teamService.findById(id, false);

            expect(returnedTeam).not.toBeDefined();

            expect(teamRepositoryFindByIdSpy).toHaveBeenCalledTimes(1);
            expect(teamRepositoryFindByIdSpy).toHaveBeenCalledWith(id);
        });
    });

    describe('updateById', () => {
        it('should return updated team by id', async () => {
            const id = 1;
            const updateTeamDto = await TeamFactory.attrs<IUpdateTeam>('UpdateTeamDto');
            const team = await TeamFactory.attrs<ITeam>('Team');

            const teamRepositoryFindByIdSpy = jest
                .spyOn(teamRepository, 'findOne')
                .mockResolvedValue(team);

            const teamRepositorySaveSpy = jest
                .spyOn(teamRepository, 'save')
                .mockResolvedValue(team);

            const updatedTeam = await teamService.updateById(id, updateTeamDto);

            expect(updatedTeam).toEqual(team);

            expect(teamRepositoryFindByIdSpy).toHaveBeenCalledTimes(1);
            expect(teamRepositoryFindByIdSpy).toHaveBeenCalledWith(id);

            expect(teamRepositorySaveSpy).toHaveBeenCalledTimes(1);
            expect(teamRepositorySaveSpy).toHaveBeenCalledWith({ ...team, ...updateTeamDto });
        });

        it('should throw an error on team not found', async () => {
            const id = 1;
            const updateTeamDto = await TeamFactory.attrs<IUpdateTeam>('UpdateTeamDto');
            const team = await TeamFactory.attrs<ITeam>('Team');

            const teamRepositoryFindByIdSpy = jest
                .spyOn(teamRepository, 'findOne')
                .mockResolvedValue(undefined);

            const teamRepositorySaveSpy = jest
                .spyOn(teamRepository, 'save')
                .mockResolvedValue(team);

            try {
                await teamService.updateById(id, updateTeamDto);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect(error.message).toEqual(`Team with id ${id} not found`);
            } finally {
                expect(teamRepositoryFindByIdSpy).toHaveBeenCalledTimes(1);
                expect(teamRepositoryFindByIdSpy).toHaveBeenCalledWith(id);

                expect(teamRepositorySaveSpy).toHaveBeenCalledTimes(0);
            }
        });
    });

    describe('remove', () => {
        it('should return undefined', async () => {
            const id = 1;
            const team = await TeamFactory.attrs<ITeam>('Team');

            const teamRepositoryFindByIdSpy = jest
                .spyOn(teamRepository, 'findOne')
                .mockResolvedValue(team);

            const teamRepositoryRemoveSpy = jest
                .spyOn(teamRepository, 'remove')
                .mockResolvedValue(undefined);

            const result = await teamService.remove(id);

            expect(result).not.toBeDefined();

            expect(teamRepositoryFindByIdSpy).toHaveBeenCalledTimes(1);
            expect(teamRepositoryFindByIdSpy).toHaveBeenCalledWith(id);

            expect(teamRepositoryRemoveSpy).toHaveBeenCalledTimes(1);
            expect(teamRepositoryRemoveSpy).toHaveBeenCalledWith(team);
        });

        it('should throw an error on team not found', async () => {
            const id = 1;

            const teamRepositoryFindByIdSpy = jest
                .spyOn(teamRepository, 'findOne')
                .mockResolvedValue(undefined);

            const teamRepositoryRemoveSpy = jest
                .spyOn(teamRepository, 'remove')
                .mockResolvedValue(undefined);

            try {
                await teamService.remove(id);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect(error.message).toEqual(`Team with id ${id} not found`);
            } finally {
                expect(teamRepositoryFindByIdSpy).toHaveBeenCalledTimes(1);
                expect(teamRepositoryFindByIdSpy).toHaveBeenCalledWith(id);

                expect(teamRepositoryRemoveSpy).toHaveBeenCalledTimes(0);
            }
        });
    });
});
