import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { PlayerFactory } from '@factories/player.factory';
import { PlayerRepositoryMock } from '@mocks/repositories/player.repository.mock';
import { ICreatePlayer } from '@player/interfaces/create-player.interface';
import { IPlayer } from '@player/interfaces/player.interface';
import { IUpdatePlayer } from '@player/interfaces/update-player.interface';
import { PlayerService } from '@player/player.service';
import { PlayerRepository } from '@player/repositories/player.repository';

describe('PlayerService', () => {
    let playerService: PlayerService;
    let playerRepository: PlayerRepository;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                PlayerService,
                {
                    provide: PlayerRepository,
                    useClass: PlayerRepositoryMock,
                },
            ],
        }).compile();

        playerService = moduleRef.get<PlayerService>(PlayerService);
        playerRepository = moduleRef.get<PlayerRepository>(PlayerRepository);
    });

    it('should be defined', () => {
        expect(playerService).toBeDefined();
    });

    describe('create', () => {
        it('should return the created player', async () => {
            const createPlayerDto = await PlayerFactory.attrs<ICreatePlayer>('CreatePlayerDto');
            const player = await PlayerFactory.attrs<IPlayer>('Player');

            const playerRepositoryCreateAndSaveSpy = jest
                .spyOn(playerRepository, 'createAndSave')
                .mockResolvedValue(player);

            const createdPlayer = await playerService.create(createPlayerDto);

            expect(createdPlayer).toEqual(player);

            expect(playerRepositoryCreateAndSaveSpy).toHaveBeenCalledTimes(1);
            expect(playerRepositoryCreateAndSaveSpy).toHaveBeenCalledWith(createPlayerDto);
        });
    });

    describe('findAll', () => {
        it('should return all the players', async () => {
            const players = await PlayerFactory.attrsMany<IPlayer>('Player', 10);

            const playerRepositoryFindSpy = jest
                .spyOn(playerRepository, 'find')
                .mockResolvedValue(players);

            const returnedPlayers = await playerService.findAll();

            expect(returnedPlayers).toEqual(players);

            expect(playerRepositoryFindSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe('findById', () => {
        it('should return player by id', async () => {
            const id = 1;
            const player = await PlayerFactory.attrs<IPlayer>('Player');

            const playerRepositoryFindOneSpy = jest
                .spyOn(playerRepository, 'findOne')
                .mockResolvedValue(player);

            const returnedPlayer = await playerService.findById(id);

            expect(returnedPlayer).toEqual(player);

            expect(playerRepositoryFindOneSpy).toHaveBeenCalledTimes(1);
            expect(playerRepositoryFindOneSpy).toHaveBeenCalledWith(id);
        });

        it('should throw an error on player not found and flag enabled', async () => {
            const id = 1;

            const playerRepositoryFindOneSpy = jest
                .spyOn(playerRepository, 'findOne')
                .mockResolvedValue(undefined);

            try {
                await playerService.findById(id);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect(error.message).toEqual(`Player with id ${id} not found`);
            } finally {
                expect(playerRepositoryFindOneSpy).toHaveBeenCalledTimes(1);
                expect(playerRepositoryFindOneSpy).toHaveBeenCalledWith(id);
            }
        });

        it("shouldn't throw an error on player not found and flag disabled", async () => {
            const id = 1;

            const playerRepositoryFindOneSpy = jest
                .spyOn(playerRepository, 'findOne')
                .mockResolvedValue(undefined);

            const returnedPlayer = await playerService.findById(id, false);

            expect(returnedPlayer).not.toBeDefined();

            expect(playerRepositoryFindOneSpy).toHaveBeenCalledTimes(1);
            expect(playerRepositoryFindOneSpy).toHaveBeenCalledWith(id);
        });
    });

    describe('updateById', () => {
        it('should return updated player by id', async () => {
            const id = 1;
            const updatePlayerDto = await PlayerFactory.attrs<IUpdatePlayer>('UpdatePlayerDto');
            const player = await PlayerFactory.attrs<IPlayer>('Player');

            const playerRepositoryFindOneSpy = jest
                .spyOn(playerRepository, 'findOne')
                .mockResolvedValue(player);

            const playerRepositorySaveSpy = jest
                .spyOn(playerRepository, 'save')
                .mockResolvedValue(player);

            const updatedPlayer = await playerService.updateById(id, updatePlayerDto);

            expect(updatedPlayer).toEqual(player);

            expect(playerRepositoryFindOneSpy).toHaveBeenCalledTimes(1);
            expect(playerRepositoryFindOneSpy).toHaveBeenCalledWith(id);

            expect(playerRepositorySaveSpy).toHaveBeenCalledTimes(1);
            expect(playerRepositorySaveSpy).toHaveBeenCalledWith({ ...player, ...updatePlayerDto });
        });

        it('should throw an error on player not found', async () => {
            const id = 1;
            const updatePlayerDto = await PlayerFactory.attrs<IUpdatePlayer>('UpdatePlayerDto');
            const player = await PlayerFactory.attrs<IPlayer>('Player');

            const playerRepositoryFindOneSpy = jest
                .spyOn(playerRepository, 'findOne')
                .mockResolvedValue(undefined);

            const playerRepositorySaveSpy = jest
                .spyOn(playerRepository, 'save')
                .mockResolvedValue(player);

            try {
                await playerService.updateById(id, updatePlayerDto);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect(error.message).toEqual(`Player with id ${id} not found`);
            } finally {
                expect(playerRepositoryFindOneSpy).toHaveBeenCalledTimes(1);
                expect(playerRepositoryFindOneSpy).toHaveBeenCalledWith(id);

                expect(playerRepositorySaveSpy).toHaveBeenCalledTimes(0);
            }
        });
    });

    describe('remove', () => {
        it('should return undefined', async () => {
            const id = 1;
            const player = await PlayerFactory.attrs<IPlayer>('Player');

            const playerRepositoryFindOneSpy = jest
                .spyOn(playerRepository, 'findOne')
                .mockResolvedValue(player);

            const playerRepositoryRemoveSpy = jest
                .spyOn(playerRepository, 'remove')
                .mockResolvedValue(player);

            const returnedValue = await playerService.remove(id);

            expect(returnedValue).not.toBeDefined();

            expect(playerRepositoryFindOneSpy).toHaveBeenCalledTimes(1);
            expect(playerRepositoryFindOneSpy).toHaveBeenCalledWith(id);

            expect(playerRepositoryRemoveSpy).toHaveBeenCalledTimes(1);
            expect(playerRepositoryRemoveSpy).toHaveBeenCalledWith(player);
        });

        it('should throw an error on player not found', async () => {
            const id = 1;
            const player = await PlayerFactory.attrs<IPlayer>('Player');

            const playerRepositoryFindOneSpy = jest
                .spyOn(playerRepository, 'findOne')
                .mockResolvedValue(undefined);

            const playerRepositoryRemoveSpy = jest
                .spyOn(playerRepository, 'remove')
                .mockResolvedValue(player);

            try {
                await playerService.remove(id);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect(error.message).toEqual(`Player with id ${id} not found`);
            } finally {
                expect(playerRepositoryFindOneSpy).toHaveBeenCalledTimes(1);
                expect(playerRepositoryFindOneSpy).toHaveBeenCalledWith(id);

                expect(playerRepositoryRemoveSpy).toHaveBeenCalledTimes(0);
            }
        });
    });
});
