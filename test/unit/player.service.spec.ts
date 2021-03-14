import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { createPlayerPayload } from '@factories/player.factory';
import { updateUserPayload } from '@factories/user.factory';
import { mockPlayerRepository } from '@mocks/repositories/player.repository.mock';
import { PlayerService } from '@player/player.service';
import { PlayerRepository } from '@player/repositories/player.repository';

describe('PlayerService', () => {
    let playerService: PlayerService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                PlayerService,
                {
                    provide: getRepositoryToken(PlayerRepository),
                    useValue: mockPlayerRepository,
                },
            ],
        }).compile();

        playerService = moduleRef.get<PlayerService>(PlayerService);
    });

    it('should be defined', () => {
        expect(playerService).toBeDefined();
    });

    describe('create', () => {
        it('should return the created player', async () => {
            const player = createPlayerPayload;
            const createdPlayer = await playerService.create(player);

            expect(createdPlayer).toMatchObject(player);
            expect(mockPlayerRepository.save).toHaveBeenCalledTimes(1);
        });
    });

    describe('findAll', () => {
        it('should return all the players', async () => {
            const players = await playerService.findAll();

            expect(players).toHaveLength(4);
            expect(mockPlayerRepository.find).toHaveBeenCalledTimes(1);
        });
    });

    describe('findById', () => {
        it('should return player by id', async () => {
            const player = await playerService.findById(1);

            expect(player).toMatchObject({ id: 1 });
            expect(mockPlayerRepository.findOne).toHaveBeenCalledTimes(1);
        });

        it('should throw an error on player not found', () => {
            expect(playerService.findById(-1)).rejects.toBeInstanceOf(NotFoundException);
            expect(mockPlayerRepository.findOne).toHaveBeenCalledTimes(1);
        });
    });

    describe('updateById', () => {
        it('should return updated player by id', async () => {
            const player = updateUserPayload;
            const updatedPlayer = await playerService.updateById(1, player);

            expect(updatedPlayer).toMatchObject({ id: 1, ...player });
            expect(mockPlayerRepository.findOne).toHaveBeenCalledTimes(1);
            expect(mockPlayerRepository.save).toHaveBeenCalledTimes(1);
        });

        it('should throw an error on player not found', () => {
            expect(playerService.updateById(-1, {})).rejects.toBeInstanceOf(NotFoundException);
            expect(mockPlayerRepository.findOne).toHaveBeenCalledTimes(1);
            expect(mockPlayerRepository.save).toHaveBeenCalledTimes(0);
        });
    });

    describe('remove', () => {
        it('should return undefined', async () => {
            const result = await playerService.remove(1);

            expect(result).not.toBeDefined();
            expect(mockPlayerRepository.findOne).toHaveBeenCalledTimes(1);
            expect(mockPlayerRepository.remove).toHaveBeenCalledTimes(1);
        });

        it('should throw an error on player not found', () => {
            expect(playerService.remove(-1)).rejects.toBeInstanceOf(NotFoundException);
            expect(mockPlayerRepository.findOne).toHaveBeenCalledTimes(1);
            expect(mockPlayerRepository.remove).toHaveBeenCalledTimes(0);
        });
    });
});
