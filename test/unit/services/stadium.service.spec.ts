import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { StadiumFactory } from '@factories/stadium.factory';
import { StadiumRepositoryMock } from '@mocks/repositories/stadium.repository.mock';
import { ICreateStadium } from '@stadium/interfaces/create-stadium.interface';
import { IStadium } from '@stadium/interfaces/stadium.interface';
import { IUpdateStadium } from '@stadium/interfaces/update-stadium.interface';
import { StadiumRepository } from '@stadium/repositories/stadium.repository';
import { StadiumService } from '@stadium/stadium.service';

describe('StadiumService', () => {
    let stadiumService: StadiumService;
    let stadiumRepository: StadiumRepository;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                StadiumService,
                {
                    provide: StadiumRepository,
                    useClass: StadiumRepositoryMock,
                },
            ],
        }).compile();

        stadiumService = moduleRef.get<StadiumService>(StadiumService);
        stadiumRepository = moduleRef.get<StadiumRepository>(StadiumRepository);
    });

    it('should be defined', () => {
        expect(stadiumService).toBeDefined();
    });

    describe('create', () => {
        it('should return the created stadium', async () => {
            const createStadiumDto = await StadiumFactory.build<ICreateStadium>('CreateStadiumDto');
            const stadium = await StadiumFactory.build<IStadium>('Stadium');

            const stadiumRepositorySaveSpy = jest
                .spyOn(stadiumRepository, 'save')
                .mockResolvedValue(stadium);

            const createdStadium = await stadiumService.create(createStadiumDto);

            expect(createdStadium).toEqual(stadium);

            expect(stadiumRepositorySaveSpy).toHaveBeenCalledTimes(1);
            expect(stadiumRepositorySaveSpy).toHaveBeenCalledWith(createStadiumDto);
        });
    });

    describe('findAll', () => {
        it('should return all the stadiums', async () => {
            const stadiums = await StadiumFactory.buildMany<IStadium>('Stadium', 10);

            const stadiumRepositoryFindSpy = jest
                .spyOn(stadiumRepository, 'find')
                .mockResolvedValue(stadiums);

            const returnedStadiums = await stadiumService.findAll();

            expect(returnedStadiums).toEqual(stadiums);

            expect(stadiumRepositoryFindSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe('findById', () => {
        it('should return a stadium by id', async () => {
            const id = 1;
            const stadium = await StadiumFactory.build<IStadium>('Stadium');

            const stadiumRepositoryFindOneSpy = jest
                .spyOn(stadiumRepository, 'findOne')
                .mockResolvedValue(stadium);

            const returnedStadium = await stadiumService.findById(id);

            expect(returnedStadium).toEqual(stadium);

            expect(stadiumRepositoryFindOneSpy).toHaveBeenCalledTimes(1);
            expect(stadiumRepositoryFindOneSpy).toHaveBeenCalledWith(id);
        });

        it('should throw an error on stadium not found and flag enabled', async () => {
            const id = 1;

            const stadiumRepositoryFindOneSpy = jest
                .spyOn(stadiumRepository, 'findOne')
                .mockResolvedValue(undefined);

            try {
                await stadiumService.findById(id);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect(error.message).toEqual(`Stadium with ${id} not found`);
            } finally {
                expect(stadiumRepositoryFindOneSpy).toHaveBeenCalledTimes(1);
                expect(stadiumRepositoryFindOneSpy).toHaveBeenCalledWith(id);
            }
        });

        it("should't throw an error on stadium not found and flag disabled", async () => {
            const id = 1;

            const stadiumRepositoryFindOneSpy = jest
                .spyOn(stadiumRepository, 'findOne')
                .mockResolvedValue(undefined);

            const returnedStadium = await stadiumService.findById(id, false);

            expect(returnedStadium).not.toBeDefined();

            expect(stadiumRepositoryFindOneSpy).toHaveBeenCalledTimes(1);
            expect(stadiumRepositoryFindOneSpy).toHaveBeenCalledWith(id);
        });
    });

    describe('updateById', () => {
        it('should return the updated stadium', async () => {
            const id = 1;
            const updateStadiumDto = await StadiumFactory.build<IUpdateStadium>('UpdateStadiumDto');
            const stadium = await StadiumFactory.build<IStadium>('Stadium');

            const stadiumRepositoryFindOneSpy = jest
                .spyOn(stadiumRepository, 'findOne')
                .mockResolvedValue(stadium);

            const stadiumRepositorySaveSpy = jest
                .spyOn(stadiumRepository, 'save')
                .mockResolvedValue(stadium);

            const updatedStadium = await stadiumService.updateById(id, updateStadiumDto);

            expect(updatedStadium).toEqual(stadium);

            expect(stadiumRepositoryFindOneSpy).toHaveBeenCalledTimes(1);
            expect(stadiumRepositoryFindOneSpy).toHaveBeenCalledWith(id);

            expect(stadiumRepositorySaveSpy).toHaveBeenCalledTimes(1);
            expect(stadiumRepositorySaveSpy).toHaveBeenCalledWith({
                ...stadium,
                ...updateStadiumDto,
            });
        });

        it('should throw an error on stadium not found', async () => {
            const id = 1;
            const updateStadiumDto = await StadiumFactory.build<IUpdateStadium>('UpdateStadiumDto');
            const stadium = await StadiumFactory.build<IStadium>('Stadium');

            const stadiumRepositoryFindOneSpy = jest
                .spyOn(stadiumRepository, 'findOne')
                .mockResolvedValue(undefined);

            const stadiumRepositorySaveSpy = jest
                .spyOn(stadiumRepository, 'save')
                .mockResolvedValue(stadium);

            try {
                await stadiumService.updateById(id, updateStadiumDto);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect(error.message).toEqual(`Stadium with ${id} not found`);
            } finally {
                expect(stadiumRepositoryFindOneSpy).toHaveBeenCalledTimes(1);
                expect(stadiumRepositoryFindOneSpy).toHaveBeenCalledWith(id);

                expect(stadiumRepositorySaveSpy).toHaveBeenCalledTimes(0);
            }
        });
    });

    describe('remove', () => {
        it('should return undefined', async () => {
            const id = 1;
            const stadium = await StadiumFactory.build<IStadium>('Stadium');

            const stadiumRepositoryFindOneSpy = jest
                .spyOn(stadiumRepository, 'findOne')
                .mockResolvedValue(stadium);

            const stadiumRepositoryRemoveSpy = jest
                .spyOn(stadiumRepository, 'remove')
                .mockResolvedValue(undefined);

            const returnedValue = await stadiumService.remove(id);

            expect(returnedValue).not.toBeDefined();

            expect(stadiumRepositoryFindOneSpy).toHaveBeenCalledTimes(1);
            expect(stadiumRepositoryFindOneSpy).toHaveBeenCalledWith(id);

            expect(stadiumRepositoryRemoveSpy).toHaveBeenCalledTimes(1);
            expect(stadiumRepositoryRemoveSpy).toHaveBeenCalledWith(stadium);
        });

        it('should throw an error on stadium not found', async () => {
            const id = 1;

            const stadiumRepositoryFindOneSpy = jest
                .spyOn(stadiumRepository, 'findOne')
                .mockResolvedValue(undefined);

            const stadiumRepositoryRemoveSpy = jest
                .spyOn(stadiumRepository, 'remove')
                .mockResolvedValue(undefined);

            try {
                await stadiumService.remove(id);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect(error.message).toEqual(`Stadium with ${id} not found`);
            } finally {
                expect(stadiumRepositoryFindOneSpy).toHaveBeenCalledTimes(1);
                expect(stadiumRepositoryFindOneSpy).toHaveBeenCalledWith(id);

                expect(stadiumRepositoryRemoveSpy).toHaveBeenCalledTimes(0);
            }
        });
    });
});
