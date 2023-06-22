import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { ITeamService } from './team.service';
import { ITeamRepository } from './team.repository';
import { TeamServiceProvider } from './team.providers';
import { ICreateTeam } from './dto/create-team.dto';
import { ITeam } from './entities/team.entity';
import { TeamExistsException } from './exceptions/exists.exception';
import { TeamNotExistsException } from './exceptions/not-exists.exception';
import { IUpdateTeam } from './dto/update-team.dto';

describe('TeamService', () => {
    let service: ITeamService;
    let repository: ITeamRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: 'TEAM_REPOSITORY',
                    useValue: {
                        create: () => {},
                        findMany: () => {},
                        findOneById: () => {},
                        findOneByName: () => {},
                        updateOneById: () => {},
                        deleteOneById: () => {},
                    },
                },
                TeamServiceProvider,
            ],
        }).compile();

        service = module.get<ITeamService>('TEAM_SERVICE');
        repository = module.get<ITeamRepository>('TEAM_REPOSITORY');
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('Create', () => {
        it('should return the created team', async () => {
            const createTeamDto: ICreateTeam = {
                name: `${faker.location.city.name} City`,
                country: faker.location.country.name,
                foundationDate: faker.date.birthdate(),
                stadiumId: faker.string.uuid(),
            };

            const team: ITeam = {
                id: faker.string.uuid(),
                name: createTeamDto.name,
                country: createTeamDto.country,
                foundationDate: createTeamDto.foundationDate,
                stadium: {
                    id: createTeamDto.stadiumId,
                    name: `${faker.person.fullName} Stadium`,
                    country: faker.location.country.name,
                    capacity: faker.number.float(),
                    foundationDate: faker.date.birthdate(),
                },
            };

            jest.spyOn(repository, 'findOneByName').mockResolvedValue(undefined);
            jest.spyOn(repository, 'create').mockResolvedValue(team);

            await expect(service.create(createTeamDto)).resolves.toStrictEqual(team);

            expect(repository.findOneByName).toHaveBeenCalledTimes(1);
            expect(repository.findOneByName).toHaveBeenCalledWith(createTeamDto.name);

            expect(repository.create).toHaveBeenCalledTimes(1);
            expect(repository.create).toHaveBeenCalledWith(createTeamDto);
        });

        it('should throw an error when a team with the given name already exists', async () => {
            const createTeamDto: ICreateTeam = {
                name: `${faker.location.city.name} City`,
                country: faker.location.country.name,
                foundationDate: faker.date.birthdate(),
                stadiumId: faker.string.uuid(),
            };

            const team: ITeam = {
                id: faker.string.uuid(),
                name: createTeamDto.name,
                country: createTeamDto.country,
                foundationDate: createTeamDto.foundationDate,
                stadium: {
                    id: createTeamDto.stadiumId,
                    name: `${faker.person.fullName} Stadium`,
                    country: faker.location.country.name,
                    capacity: faker.number.float(),
                    foundationDate: faker.date.birthdate(),
                },
            };

            jest.spyOn(repository, 'findOneByName').mockResolvedValue(team);
            jest.spyOn(repository, 'create');

            await expect(service.create(createTeamDto)).rejects.toThrowError(TeamExistsException);

            expect(repository.findOneByName).toHaveBeenCalledTimes(1);
            expect(repository.findOneByName).toHaveBeenCalledWith(createTeamDto.name);

            expect(repository.create).toHaveBeenCalledTimes(0);
        });
    });

    describe('FindAll', () => {
        it('should return the retrieved teams', async () => {
            const teams: Array<ITeam> = faker.helpers.multiple(
                () => ({
                    id: faker.string.uuid(),
                    name: `${faker.location.city.name} City`,
                    country: faker.location.country.name,
                    foundationDate: faker.date.birthdate(),
                    stadium: {
                        id: faker.string.uuid(),
                        name: `${faker.person.fullName} Stadium`,
                        country: faker.location.country.name,
                        capacity: faker.number.float(),
                        foundationDate: faker.date.birthdate(),
                    },
                }),
                {
                    count: 5,
                }
            );

            jest.spyOn(repository, 'findMany').mockResolvedValue(teams);

            await expect(service.findAll()).resolves.toStrictEqual(teams);

            expect(repository.findMany).toHaveBeenCalledTimes(1);
        });
    });

    describe('FindOneById', () => {
        it('should return the retrieved team', async () => {
            const id = faker.string.uuid();
            const team: ITeam = {
                id,
                name: `${faker.location.city.name} City`,
                country: faker.location.country.name,
                foundationDate: faker.date.birthdate(),
                stadium: {
                    id: faker.string.uuid(),
                    name: `${faker.person.fullName} Stadium`,
                    country: faker.location.country.name,
                    capacity: faker.number.float(),
                    foundationDate: faker.date.birthdate(),
                },
            };

            jest.spyOn(repository, 'findOneById').mockResolvedValue(team);

            await expect(service.findOneById(id)).resolves.toStrictEqual(team);

            expect(repository.findOneById).toHaveBeenCalledTimes(1);
            expect(repository.findOneById).toHaveBeenCalledWith(id);
        });

        it('should throw an error when a team with the given id is not found', async () => {
            const id = faker.string.uuid();

            jest.spyOn(repository, 'findOneById').mockResolvedValue(undefined);

            await expect(service.findOneById(id)).rejects.toThrowError(TeamNotExistsException);

            expect(repository.findOneById).toHaveBeenCalledTimes(1);
            expect(repository.findOneById).toHaveBeenCalledWith(id);
        });
    });

    describe('UpdateOneById', () => {
        it('should return the updated team', async () => {
            const id = faker.string.uuid();
            const data: IUpdateTeam = {
                name: `${faker.location.city.name} City`,
                country: faker.location.country.name,
                foundationDate: faker.date.birthdate(),
                stadiumId: faker.string.uuid(),
            };

            const team: ITeam = {
                id,
                name: data.name,
                country: data.country,
                foundationDate: data.foundationDate,
                stadium: {
                    id: data.stadiumId,
                    name: `${faker.person.fullName} Stadium`,
                    country: faker.location.country.name,
                    capacity: faker.number.float(),
                    foundationDate: faker.date.birthdate(),
                },
            };

            jest.spyOn(repository, 'updateOneById').mockResolvedValue(team);

            await expect(service.updateOneById(id, data)).resolves.toStrictEqual(team);

            expect(repository.updateOneById).toHaveBeenCalledTimes(1);
            expect(repository.updateOneById).toHaveBeenCalledWith(id, data);
        });
    });

    describe('RemovedOneById', () => {
        it('should delete a team with no return', async () => {
            const id = faker.string.uuid();

            jest.spyOn(repository, 'deleteOneById');

            await expect(service.removeOneById(id)).resolves.toBeUndefined();

            expect(repository.deleteOneById).toHaveBeenCalledTimes(1);
            expect(repository.deleteOneById).toHaveBeenCalledWith(id);
        });
    });
});
