import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { createStadiumPayload, updateStadiumPayload } from '@factories/stadium.factory';
import { mockStadiumRepository } from '@mocks/repositories/stadium.repository.mock';
import { StadiumRepository } from '@stadium/repositories/stadium.repository';
import { StadiumService } from '@stadium/stadium.service';

describe('StadiumService', () => {
    let stadiumService: StadiumService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                StadiumService,
                {
                    provide: getRepositoryToken(StadiumRepository),
                    useValue: mockStadiumRepository,
                },
            ],
        }).compile();

        stadiumService = moduleRef.get<StadiumService>(StadiumService);
    });

    it('should be defined', () => {
        expect(stadiumService).toBeDefined();
    });

    describe('create', () => {
        it('should return created stadium', async () => {
            const stadium = createStadiumPayload;
            const createdStadium = await stadiumService.create(stadium);

            expect(createdStadium).toMatchObject(stadium);
            expect(mockStadiumRepository.save).toHaveBeenCalledTimes(1);
        });
    });

    describe('findAll', () => {
        it('should return all the stadiums', async () => {
            const stadiums = await stadiumService.findAll();

            expect(stadiums).toHaveLength(4);
            expect(mockStadiumRepository.find).toHaveBeenCalledTimes(1);
        });
    });

    describe('findById', () => {
        it('should return a stadium by id', async () => {
            const stadium = await stadiumService.findById(1);

            expect(stadium).toMatchObject({ id: 1 });
            expect(mockStadiumRepository.findOne).toHaveBeenCalledTimes(1);
        });

        it('should throw an error on stadium not found', () => {
            expect(stadiumService.findById(-1)).rejects.toBeInstanceOf(NotFoundException);
            expect(mockStadiumRepository.findOne).toHaveBeenCalledTimes(1);
        });
    });

    describe('updateById', () => {
        it('should updated return a stadium by id', async () => {
            const stadium = updateStadiumPayload;
            const updatedStadium = await stadiumService.updateById(1, stadium);

            expect(updatedStadium).toMatchObject({ id: 1, ...stadium });
            expect(mockStadiumRepository.findOne).toHaveBeenCalledTimes(1);
        });

        it('should throw an error on stadium not found', () => {
            expect(stadiumService.updateById(-1, {})).rejects.toBeInstanceOf(NotFoundException);
            expect(mockStadiumRepository.findOne).toHaveBeenCalledTimes(1);
            expect(mockStadiumRepository.save).toHaveBeenCalledTimes(0);
        });
    });

    describe('remove', () => {
        it('should return undefined', async () => {
            const result = await stadiumService.remove(1);

            expect(result).not.toBeDefined();
            expect(mockStadiumRepository.remove).toHaveBeenCalledTimes(1);
        });

        it('should throw an error on stadium not found', () => {
            expect(stadiumService.remove(-1)).rejects.toBeInstanceOf(NotFoundException);
            expect(mockStadiumRepository.findOne).toHaveBeenCalledTimes(1);
            expect(mockStadiumRepository.remove).toHaveBeenCalledTimes(0);
        });
    });
});
