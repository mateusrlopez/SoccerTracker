import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { FootballerFactory } from '@factories/footballer.factory';
import { FootballerService } from '@footballer/footballer.service';
import { ICreateFootballer } from '@footballer/interfaces/create-footballer.interface';
import { IFootballer } from '@footballer/interfaces/footballer.interface';
import { IUpdateFootballer } from '@footballer/interfaces/update-footballer.interface';
import { FootballerRepository } from '@footballer/repositories/footballer.repository';
import { FootballerRepositoryMock } from '@mocks/repositories/footballer.repository.mock';

describe('FootballerService', () => {
    let footballerService: FootballerService;
    let footballerRepository: FootballerRepository;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                FootballerService,
                {
                    provide: FootballerRepository,
                    useClass: FootballerRepositoryMock,
                },
            ],
        }).compile();

        footballerService = moduleRef.get<FootballerService>(FootballerService);
        footballerRepository = moduleRef.get<FootballerRepository>(FootballerRepository);
    });

    it('should be defined', () => {
        expect(footballerService).toBeDefined();
    });

    describe('create', () => {
        it('should return the created footballer', async () => {
            const updateFootballerDto = await FootballerFactory.attrs<ICreateFootballer>(
                'CreateFootballerDto'
            );
            const footballer = await FootballerFactory.attrs<IFootballer>('Footballer');

            const footballerRepositoryCreateAndSaveSpy = jest
                .spyOn(footballerRepository, 'createAndSave')
                .mockResolvedValue(footballer);

            const createdFootballer = await footballerService.create(updateFootballerDto);

            expect(createdFootballer).toEqual(footballer);

            expect(footballerRepositoryCreateAndSaveSpy).toHaveBeenCalledTimes(1);
            expect(footballerRepositoryCreateAndSaveSpy).toHaveBeenCalledWith(updateFootballerDto);
        });
    });

    describe('findAll', () => {
        it('should return all the footballers', async () => {
            const footballers = await FootballerFactory.attrsMany<IFootballer>('Footballer', 10);

            const footballerRepositoryFindSpy = jest
                .spyOn(footballerRepository, 'find')
                .mockResolvedValue(footballers);

            const returnedFootballers = await footballerService.findAll();

            expect(returnedFootballers).toEqual(footballers);

            expect(footballerRepositoryFindSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe('findById', () => {
        it('should return footballer by id', async () => {
            const id = 1;
            const footballer = await FootballerFactory.attrs<IFootballer>('Footballer');

            const footballerRepositoryFindOneSpy = jest
                .spyOn(footballerRepository, 'findOne')
                .mockResolvedValue(footballer);

            const returnedFootballer = await footballerService.findById(id);

            expect(returnedFootballer).toEqual(footballer);

            expect(footballerRepositoryFindOneSpy).toHaveBeenCalledTimes(1);
            expect(footballerRepositoryFindOneSpy).toHaveBeenCalledWith(id);
        });

        it('should throw an error on footballer not found and flag enabled', async () => {
            const id = 1;

            const footballerRepositoryFindOneSpy = jest
                .spyOn(footballerRepository, 'findOne')
                .mockResolvedValue(undefined);

            try {
                await footballerService.findById(id);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect(error.message).toEqual(`Footballer with id ${id} not found`);
            } finally {
                expect(footballerRepositoryFindOneSpy).toHaveBeenCalledTimes(1);
                expect(footballerRepositoryFindOneSpy).toHaveBeenCalledWith(id);
            }
        });

        it("shouldn't throw an error on footballer not found and flag disabled", async () => {
            const id = 1;

            const footballerRepositoryFindOneSpy = jest
                .spyOn(footballerRepository, 'findOne')
                .mockResolvedValue(undefined);

            const returnedFootballer = await footballerService.findById(id, false);

            expect(returnedFootballer).not.toBeDefined();

            expect(footballerRepositoryFindOneSpy).toHaveBeenCalledTimes(1);
            expect(footballerRepositoryFindOneSpy).toHaveBeenCalledWith(id);
        });
    });

    describe('updateById', () => {
        it('should return updated footballer by id', async () => {
            const id = 1;
            const updateFootballerDto = await FootballerFactory.attrs<IUpdateFootballer>(
                'UpdateFootballerDto'
            );
            const footballer = await FootballerFactory.attrs<IFootballer>('Footballer');

            const footballerRepositoryFindOneSpy = jest
                .spyOn(footballerRepository, 'findOne')
                .mockResolvedValue(footballer);

            const footballerRepositorySaveSpy = jest
                .spyOn(footballerRepository, 'save')
                .mockResolvedValue(footballer);

            const updatedFootballer = await footballerService.updateById(id, updateFootballerDto);

            expect(updatedFootballer).toEqual(footballer);

            expect(footballerRepositoryFindOneSpy).toHaveBeenCalledTimes(1);
            expect(footballerRepositoryFindOneSpy).toHaveBeenCalledWith(id);

            expect(footballerRepositorySaveSpy).toHaveBeenCalledTimes(1);
            expect(footballerRepositorySaveSpy).toHaveBeenCalledWith({
                ...footballer,
                ...updateFootballerDto,
            });
        });

        it('should throw an error on footballer not found', async () => {
            const id = 1;
            const updateFootballerDto = await FootballerFactory.attrs<IUpdateFootballer>(
                'UpdateFootballerDto'
            );
            const footballer = await FootballerFactory.attrs<IFootballer>('Footballer');

            const footballerRepositoryFindOneSpy = jest
                .spyOn(footballerRepository, 'findOne')
                .mockResolvedValue(undefined);

            const footballerRepositorySaveSpy = jest
                .spyOn(footballerRepository, 'save')
                .mockResolvedValue(footballer);

            try {
                await footballerService.updateById(id, updateFootballerDto);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect(error.message).toEqual(`Footballer with id ${id} not found`);
            } finally {
                expect(footballerRepositoryFindOneSpy).toHaveBeenCalledTimes(1);
                expect(footballerRepositoryFindOneSpy).toHaveBeenCalledWith(id);

                expect(footballerRepositorySaveSpy).toHaveBeenCalledTimes(0);
            }
        });
    });

    describe('remove', () => {
        it('should return undefined', async () => {
            const id = 1;
            const footballer = await FootballerFactory.attrs<IFootballer>('Footballer');

            const footballerRepositoryFindOneSpy = jest
                .spyOn(footballerRepository, 'findOne')
                .mockResolvedValue(footballer);

            const footballerRepositoryRemoveSpy = jest
                .spyOn(footballerRepository, 'remove')
                .mockResolvedValue(footballer);

            const returnedValue = await footballerService.remove(id);

            expect(returnedValue).not.toBeDefined();

            expect(footballerRepositoryFindOneSpy).toHaveBeenCalledTimes(1);
            expect(footballerRepositoryFindOneSpy).toHaveBeenCalledWith(id);

            expect(footballerRepositoryRemoveSpy).toHaveBeenCalledTimes(1);
            expect(footballerRepositoryRemoveSpy).toHaveBeenCalledWith(footballer);
        });

        it('should throw an error on footballer not found', async () => {
            const id = 1;
            const footballer = await FootballerFactory.attrs<IFootballer>('Footballer');

            const footballerRepositoryFindOneSpy = jest
                .spyOn(footballerRepository, 'findOne')
                .mockResolvedValue(undefined);

            const footballerRepositoryRemoveSpy = jest
                .spyOn(footballerRepository, 'remove')
                .mockResolvedValue(footballer);

            try {
                await footballerService.remove(id);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect(error.message).toEqual(`Footballer with id ${id} not found`);
            } finally {
                expect(footballerRepositoryFindOneSpy).toHaveBeenCalledTimes(1);
                expect(footballerRepositoryFindOneSpy).toHaveBeenCalledWith(id);

                expect(footballerRepositoryRemoveSpy).toHaveBeenCalledTimes(0);
            }
        });
    });
});
