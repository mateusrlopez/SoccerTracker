import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { IUserService } from './user.service';
import { IUserRepository } from './user.repository';
import { UserServiceProvider } from './user.providers';
import { ICreateUser } from './dto/create-user.dto';
import { UserAlreadyExistsException } from './exceptions/exists.exception';
import { IUser } from './entities/user.entity';
import { UserNotExistsException } from './exceptions/not-exists.exceptions';
import { IUpdateUser } from './dto/update-user.dto';

describe('UserService', () => {
    let service: IUserService;
    let repository: IUserRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: 'USER_REPOSITORY',
                    useValue: {
                        create: () => {},
                        findMany: () => {},
                        findOneById: () => {},
                        findOneByEmail: () => {},
                        updateOneById: () => {},
                        deleteOneById: () => {},
                    },
                },
                UserServiceProvider,
            ],
        }).compile();

        service = module.get<IUserService>('USER_SERVICE');
        repository = module.get<IUserRepository>('USER_REPOSITORY');
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('Create', () => {
        it('should return the created user', async () => {
            const createUserDto: ICreateUser = {
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                birthdate: faker.date.birthdate(),
            };

            const user = {
                id: faker.string.uuid(),
                ...createUserDto,
            };

            jest.spyOn(repository, 'findOneByEmail').mockResolvedValue(undefined);
            jest.spyOn(repository, 'create').mockResolvedValue(user);

            await expect(service.create(createUserDto)).resolves.toStrictEqual(user);

            expect(repository.findOneByEmail).toHaveBeenCalledTimes(1);
            expect(repository.findOneByEmail).toHaveBeenCalledWith(createUserDto.email);

            expect(repository.create).toHaveBeenCalledTimes(1);
            expect(repository.create).toHaveBeenCalledWith(createUserDto);
        });

        it('should throw an error when an user with the given email already exists', async () => {
            const createUserDto: ICreateUser = {
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                birthdate: faker.date.birthdate(),
            };

            jest.spyOn(repository, 'findOneByEmail').mockResolvedValue({
                id: faker.string.uuid(),
                ...createUserDto,
            });
            jest.spyOn(repository, 'create');

            await expect(service.create(createUserDto)).rejects.toThrow(UserAlreadyExistsException);

            expect(repository.findOneByEmail).toHaveBeenCalledTimes(1);
            expect(repository.findOneByEmail).toHaveBeenCalledWith(createUserDto.email);

            expect(repository.create).toHaveBeenCalledTimes(0);
        });
    });

    describe('FindAll', () => {
        it('should return the retrieved users', async () => {
            const users: Array<IUser> = faker.helpers.multiple(
                () => ({
                    id: faker.string.uuid(),
                    firstName: faker.person.firstName(),
                    lastName: faker.person.lastName(),
                    email: faker.internet.email(),
                    password: faker.internet.password(),
                    birthdate: faker.date.birthdate(),
                }),
                { count: 5 }
            );

            jest.spyOn(repository, 'findMany').mockResolvedValue(users);

            await expect(service.findAll()).resolves.toStrictEqual(users);

            expect(repository.findMany).toHaveBeenCalledTimes(1);
        });
    });

    describe('FindOneById', () => {
        it('should return the retrieved user', async () => {
            const id = faker.string.uuid();
            const user: IUser = {
                id,
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                birthdate: faker.date.birthdate(),
            };

            jest.spyOn(repository, 'findOneById').mockResolvedValue(user);

            await expect(service.findOneById(id)).resolves.toStrictEqual(user);

            expect(repository.findOneById).toHaveBeenCalledTimes(1);
            expect(repository.findOneById).toHaveBeenCalledWith(id);
        });

        it('should throw an error when an user with the given id is not found', async () => {
            const id = faker.string.uuid();

            jest.spyOn(repository, 'findOneById').mockResolvedValue(undefined);

            await expect(service.findOneById(id)).rejects.toThrowError(UserNotExistsException);

            expect(repository.findOneById).toHaveBeenCalledTimes(1);
            expect(repository.findOneById).toHaveBeenCalledWith(id);
        });
    });

    describe('FindOneByEmail', () => {
        it('should return the retrieved user', async () => {
            const email = faker.internet.email();
            const user: IUser = {
                id: faker.string.uuid(),
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email,
                password: faker.internet.password(),
                birthdate: faker.date.birthdate(),
            };

            jest.spyOn(repository, 'findOneByEmail').mockResolvedValue(user);

            await expect(service.findOneByEmail(email)).resolves.toStrictEqual(user);

            expect(repository.findOneByEmail).toHaveBeenCalledTimes(1);
            expect(repository.findOneByEmail).toHaveBeenCalledWith(email);
        });

        it('should throw an error when an user with the given email is not found', async () => {
            const email = faker.internet.email();

            jest.spyOn(repository, 'findOneByEmail').mockResolvedValue(undefined);

            await expect(service.findOneByEmail(email)).rejects.toThrowError(
                UserNotExistsException
            );

            expect(repository.findOneByEmail).toHaveBeenCalledTimes(1);
            expect(repository.findOneByEmail).toHaveBeenCalledWith(email);
        });
    });

    describe('UpdateOneById', () => {
        it('should return the updated user', async () => {
            const uuid = faker.string.uuid();
            const updateUserDto: IUpdateUser = {
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                birthdate: faker.date.birthdate(),
            };

            jest.spyOn(repository, 'updateOneById').mockImplementation(
                async (id: string, data: IUpdateUser) => {
                    return {
                        ...data,
                        id,
                        password: faker.internet.password(),
                    };
                }
            );

            const updated = await service.updateOneById(uuid, updateUserDto);

            expect(updated.id).toStrictEqual(uuid);
            expect(updated.firstName).toStrictEqual(updateUserDto.firstName);
            expect(updated.lastName).toStrictEqual(updateUserDto.lastName);
            expect(updated.email).toStrictEqual(updateUserDto.email);
            expect(updated.birthdate).toStrictEqual(updateUserDto.birthdate);

            expect(repository.updateOneById).toHaveBeenCalledTimes(1);
            expect(repository.updateOneById).toHaveBeenCalledWith(uuid, updateUserDto);
        });
    });

    describe('RemovedOneById', () => {
        it('should delete an user with no return', async () => {
            const id = faker.string.uuid();

            jest.spyOn(repository, 'deleteOneById');

            await expect(service.removeOneById(id)).resolves.toBeUndefined();

            expect(repository.deleteOneById).toHaveBeenCalledTimes(1);
            expect(repository.deleteOneById).toHaveBeenCalledWith(id);
        });
    });
});
