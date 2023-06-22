import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { IMatchService } from './match.service';
import { MatchServiceProvider } from './match.providers';
import { IMatchRepository } from './match.repository';
import { ICreateMatch } from './dto/create-match.dto';
import { IMatch } from './entities/match.entity';
import { MatchNotExistsException } from './exceptions/not-exists.exception';
import { IUpdateMatch } from './dto/update-match.dto';

describe('MatchService', () => {
    let service: IMatchService;
    let repository: IMatchRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: 'MATCH_REPOSITORY',
                    useValue: {
                        create: () => {},
                        findMany: () => {},
                        findOneById: () => {},
                        updateOneById: () => {},
                        deleteOneById: () => {},
                    },
                },
                MatchServiceProvider,
            ],
        }).compile();

        service = module.get<IMatchService>('MATCH_SERVICE');
        repository = module.get<IMatchRepository>('MATCH_REPOSITORY');
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('Create', () => {
        it('should return the created match', async () => {
            const createMatchDto: ICreateMatch = {
                date: faker.date.past(),
                stadiumId: faker.string.uuid(),
                homeTeamId: faker.string.uuid(),
                homeTeamScore: faker.number.int({ min: 0, max: 10 }),
                awayTeamId: faker.string.uuid(),
                awayTeamScore: faker.number.int({ min: 0, max: 10 }),
            };

            const match: IMatch = {
                id: faker.string.uuid(),
                date: createMatchDto.date,
                stadium: {
                    id: createMatchDto.stadiumId,
                    name: `${faker.person.fullName} Stadium`,
                    country: faker.location.country.name,
                    capacity: faker.number.float(),
                    foundationDate: faker.date.birthdate(),
                },
                homeTeam: {
                    id: createMatchDto.homeTeamId,
                    name: `${faker.location.city.name} City`,
                    country: faker.location.country.name,
                    foundationDate: faker.date.birthdate(),
                },
                homeTeamScore: createMatchDto.homeTeamScore,
                awayTeam: {
                    id: createMatchDto.awayTeamId,
                    name: `${faker.location.city.name} City`,
                    country: faker.location.country.name,
                    foundationDate: faker.date.birthdate(),
                },
                awayTeamScore: createMatchDto.awayTeamScore,
            };

            jest.spyOn(repository, 'create').mockResolvedValue(match);

            await expect(service.create(createMatchDto)).resolves.toStrictEqual(match);

            expect(repository.create).toHaveBeenCalledTimes(1);
            expect(repository.create).toHaveBeenCalledWith(createMatchDto);
        });
    });

    describe('FindAll', () => {
        it('should return the retrieved matches', async () => {
            const matches: Array<IMatch> = faker.helpers.multiple(
                () => ({
                    id: faker.string.uuid(),
                    date: faker.date.past(),
                    stadium: {
                        id: faker.string.uuid(),
                        name: `${faker.person.fullName} Stadium`,
                        country: faker.location.country.name,
                        capacity: faker.number.float(),
                        foundationDate: faker.date.birthdate(),
                    },
                    homeTeam: {
                        id: faker.string.uuid(),
                        name: `${faker.location.city.name} City`,
                        country: faker.location.country.name,
                        foundationDate: faker.date.birthdate(),
                    },
                    homeTeamScore: faker.number.int({ min: 0, max: 10 }),
                    awayTeam: {
                        id: faker.string.uuid(),
                        name: `${faker.location.city.name} City`,
                        country: faker.location.country.name,
                        foundationDate: faker.date.birthdate(),
                    },
                    awayTeamScore: faker.number.int({ min: 0, max: 10 }),
                }),
                {
                    count: 5,
                }
            );

            jest.spyOn(repository, 'findMany').mockResolvedValue(matches);

            await expect(service.findAll()).resolves.toStrictEqual(matches);

            expect(repository.findMany).toHaveBeenCalledTimes(1);
        });
    });

    describe('FindOneById', () => {
        it('should return the retrieved match', async () => {
            const id = faker.string.uuid();
            const match: IMatch = {
                id,
                date: faker.date.past(),
                stadium: {
                    id: faker.string.uuid(),
                    name: `${faker.person.fullName} Stadium`,
                    country: faker.location.country.name,
                    capacity: faker.number.float(),
                    foundationDate: faker.date.birthdate(),
                },
                homeTeam: {
                    id: faker.string.uuid(),
                    name: `${faker.location.city.name} City`,
                    country: faker.location.country.name,
                    foundationDate: faker.date.birthdate(),
                },
                homeTeamScore: faker.number.int({ min: 0, max: 10 }),
                awayTeam: {
                    id: faker.string.uuid(),
                    name: `${faker.location.city.name} City`,
                    country: faker.location.country.name,
                    foundationDate: faker.date.birthdate(),
                },
                awayTeamScore: faker.number.int({ min: 0, max: 10 }),
            };

            jest.spyOn(repository, 'findOneById').mockResolvedValue(match);

            await expect(service.findOneById(id)).resolves.toStrictEqual(match);

            expect(repository.findOneById).toHaveBeenCalledTimes(1);
            expect(repository.findOneById).toHaveBeenCalledWith(id);
        });

        it('should throw an error when a match with the given id is not found', async () => {
            const id = faker.string.uuid();

            jest.spyOn(repository, 'findOneById').mockResolvedValue(undefined);

            await expect(service.findOneById(id)).rejects.toThrowError(MatchNotExistsException);

            expect(repository.findOneById).toHaveBeenCalledTimes(1);
            expect(repository.findOneById).toHaveBeenCalledWith(id);
        });
    });

    describe('UpdateOneById', () => {
        it('should return the updated match', async () => {
            const id = faker.string.uuid();
            const data: IUpdateMatch = {
                date: faker.date.past(),
                stadiumId: faker.string.uuid(),
                homeTeamId: faker.string.uuid(),
                homeTeamScore: faker.number.int({ min: 0, max: 10 }),
                awayTeamId: faker.string.uuid(),
                awayTeamScore: faker.number.int({ min: 0, max: 10 }),
            };

            const match: IMatch = {
                id,
                date: data.date,
                stadium: {
                    id: data.stadiumId,
                    name: `${faker.person.fullName} Stadium`,
                    country: faker.location.country.name,
                    capacity: faker.number.float(),
                    foundationDate: faker.date.birthdate(),
                },
                homeTeam: {
                    id: data.homeTeamId,
                    name: `${faker.location.city.name} City`,
                    country: faker.location.country.name,
                    foundationDate: faker.date.birthdate(),
                },
                homeTeamScore: data.homeTeamScore,
                awayTeam: {
                    id: data.awayTeamId,
                    name: `${faker.location.city.name} City`,
                    country: faker.location.country.name,
                    foundationDate: faker.date.birthdate(),
                },
                awayTeamScore: data.awayTeamScore,
            };

            jest.spyOn(repository, 'updateOneById').mockResolvedValue(match);

            await expect(service.updateOneById(id, data)).resolves.toStrictEqual(match);

            expect(repository.updateOneById).toHaveBeenCalledTimes(1);
            expect(repository.updateOneById).toHaveBeenCalledWith(id, data);
        });
    });

    describe('RemovedOneById', () => {
        it('should delete a match with no return', async () => {
            const id = faker.string.uuid();

            jest.spyOn(repository, 'deleteOneById');

            await expect(service.removeOneById(id)).resolves.toBeUndefined();

            expect(repository.deleteOneById).toHaveBeenCalledTimes(1);
            expect(repository.deleteOneById).toHaveBeenCalledWith(id);
        });
    });
});
