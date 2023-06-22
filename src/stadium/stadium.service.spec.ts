import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { IStadiumService } from './stadium.service';
import { StadiumServiceProvider } from './stadium.providers';
import { IStadiumRepository } from './stadium.repository';
import { ICreateStadium } from './dto/create-stadium.dto';
import { StadiumExistsException } from './exceptions/exists.exception';
import { IStadium } from './entities/stadium.entity';
import { StadiumNotExistsException } from './exceptions/not-exists.exception';
import { IUpdateStadium } from './dto/update-stadium.dto';

describe('StadiumService', () => {
    let service: IStadiumService;
    let repository: IStadiumRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: 'STADIUM_REPOSITORY',
                    useValue: {
                        create: () => {},
                        findMany: () => {},
                        findOneById: () => {},
                        findOneByName: () => {},
                        updateOneById: () => {},
                        deleteOneById: () => {},
                    },
                },
                StadiumServiceProvider,
            ],
        }).compile();

        service = module.get<IStadiumService>('STADIUM_SERVICE');
        repository = module.get<IStadiumRepository>('STADIUM_REPOSITORY');
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('Create', () => {
        it('should return the created stadium', async () => {
            const createStadiumDto: ICreateStadium = {
                name: `${faker.person.fullName} Stadium`,
                country: faker.location.country.name,
                capacity: faker.number.float(),
                foundationDate: faker.date.birthdate(),
            };

            const stadium = {
                id: faker.string.uuid(),
                ...createStadiumDto,
            };

            jest.spyOn(repository, 'findOneByName').mockResolvedValue(undefined);
            jest.spyOn(repository, 'create').mockResolvedValue(stadium);

            await expect(service.create(createStadiumDto)).resolves.toStrictEqual(stadium);

            expect(repository.findOneByName).toHaveBeenCalledTimes(1);
            expect(repository.findOneByName).toHaveBeenCalledWith(createStadiumDto.name);

            expect(repository.create).toHaveBeenCalledTimes(1);
            expect(repository.create).toHaveBeenCalledWith(createStadiumDto);
        });

        it('should throw an error when a stadium with the given name already exists', async () => {
            const createStadiumDto: ICreateStadium = {
                name: `${faker.person.fullName} Stadium`,
                country: faker.location.country.name,
                capacity: faker.number.float(),
                foundationDate: faker.date.birthdate(),
            };

            const stadium = {
                id: faker.string.uuid(),
                ...createStadiumDto,
            };

            jest.spyOn(repository, 'findOneByName').mockResolvedValue(stadium);
            jest.spyOn(repository, 'create');

            await expect(service.create(createStadiumDto)).rejects.toThrowError(
                StadiumExistsException
            );

            expect(repository.findOneByName).toHaveBeenCalledTimes(1);
            expect(repository.findOneByName).toHaveBeenCalledWith(createStadiumDto.name);

            expect(repository.create).toHaveBeenCalledTimes(0);
        });
    });

    describe('FindAll', () => {
        it('should return the retrieved stadiums', async () => {
            const stadiums: Array<IStadium> = faker.helpers.multiple(
                () => ({
                    id: faker.string.uuid(),
                    name: `${faker.person.fullName} Stadium`,
                    country: faker.location.country.name,
                    capacity: faker.number.float(),
                    foundationDate: faker.date.birthdate(),
                }),
                {
                    count: 5,
                }
            );

            jest.spyOn(repository, 'findMany').mockResolvedValue(stadiums);

            await expect(service.findAll()).resolves.toStrictEqual(stadiums);

            expect(repository.findMany).toHaveBeenCalledTimes(1);
        });
    });

    describe('FindOneById', () => {
        it('should return the retrieved stadium', async () => {
            const id = faker.string.uuid();
            const stadium: IStadium = {
                id,
                name: `${faker.person.fullName} Stadium`,
                country: faker.location.country.name,
                capacity: faker.number.float(),
                foundationDate: faker.date.birthdate(),
            };

            jest.spyOn(repository, 'findOneById').mockResolvedValue(stadium);

            await expect(service.findOneById(id)).resolves.toStrictEqual(stadium);

            expect(repository.findOneById).toHaveBeenCalledTimes(1);
            expect(repository.findOneById).toHaveBeenCalledWith(id);
        });

        it('should throw an error when a stadium with the given id is not found', async () => {
            const id = faker.string.uuid();

            jest.spyOn(repository, 'findOneById').mockResolvedValue(undefined);

            await expect(service.findOneById(id)).rejects.toThrowError(StadiumNotExistsException);

            expect(repository.findOneById).toHaveBeenCalledTimes(1);
            expect(repository.findOneById).toHaveBeenCalledWith(id);
        });
    });

    describe('UpdateOneById', () => {
        it('should return the updated stadium', async () => {
            const id = faker.string.uuid();
            const data: IUpdateStadium = {
                name: `${faker.person.fullName} Stadium`,
                country: faker.location.country.name,
                capacity: faker.number.float(),
                foundationDate: faker.date.birthdate(),
            };

            const stadium: IStadium = {
                id,
                ...data,
            };

            jest.spyOn(repository, 'updateOneById').mockResolvedValue(stadium);

            await expect(service.updateOneById(id, data)).resolves.toStrictEqual(stadium);

            expect(repository.updateOneById).toHaveBeenCalledTimes(1);
            expect(repository.updateOneById).toHaveBeenCalledWith(id, data);
        });
    });

    describe('RemovedOneById', () => {
        it('should delete a stadium with no return', async () => {
            const id = faker.string.uuid();

            jest.spyOn(repository, 'deleteOneById');

            await expect(service.removeOneById(id)).resolves.toBeUndefined();

            expect(repository.deleteOneById).toHaveBeenCalledTimes(1);
            expect(repository.deleteOneById).toHaveBeenCalledWith(id);
        });
    });
});
