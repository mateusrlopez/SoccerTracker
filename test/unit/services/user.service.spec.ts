import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { UserFactory } from '@factories/user.factory';
import { UserRepositoryMock } from '@mocks/repositories/user.repository.mock';
import { ICreateUser } from '@user/interfaces/create-user.interface';
import { IQueryUser } from '@user/interfaces/query-user.interface';
import { IUpdateUser } from '@user/interfaces/update-user.interface';
import { IUser } from '@user/interfaces/user.interface';
import { UserRepository } from '@user/repositories/user.repository';
import { UserService } from '@user/user.service';

describe('UserService', () => {
    let userService: UserService;
    let userRepository: UserRepository;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: UserRepository,
                    useClass: UserRepositoryMock,
                },
            ],
        }).compile();

        userService = moduleRef.get<UserService>(UserService);
        userRepository = moduleRef.get<UserRepository>(UserRepository);
    });

    it('should be defined', () => {
        expect(userService).toBeDefined();
    });

    describe('create', () => {
        it('should return the created user', async () => {
            const createUserDto = await UserFactory.attrs<ICreateUser>('CreateUserDto');
            const user = await UserFactory.attrs<IUser>('User');

            const userRepositorySaveSpy = jest
                .spyOn(userRepository, 'save')
                .mockResolvedValue(user);

            const createdUser = await userService.create(createUserDto);

            expect(createdUser).toEqual(user);

            expect(userRepositorySaveSpy).toHaveBeenCalledTimes(1);
            expect(userRepositorySaveSpy).toHaveBeenCalledWith(createUserDto);
        });
    });

    describe('findAll', () => {
        it('should return all users', async () => {
            const users = await UserFactory.attrsMany<IUser>('User', 10);

            const userRepositoryFindSpy = jest
                .spyOn(userRepository, 'find')
                .mockResolvedValue(users);

            const returnedUsers = await userService.findAll({});

            expect(returnedUsers).toEqual(users);

            expect(userRepositoryFindSpy).toHaveBeenCalledTimes(1);
            expect(userRepositoryFindSpy).toHaveBeenCalledWith({});
        });

        it('should filter users by query', async () => {
            const userQueryDto = await UserFactory.attrs<IQueryUser>('QueryUserDto');
            const users = await UserFactory.attrsMany<IUser>('User', 10);

            const userRepositoryFindSpy = jest
                .spyOn(userRepository, 'find')
                .mockResolvedValue(users);

            const returnedUsers = await userService.findAll(userQueryDto);

            expect(returnedUsers).toEqual(users);

            expect(userRepositoryFindSpy).toHaveBeenCalledTimes(1);
            expect(userRepositoryFindSpy).toHaveBeenCalledWith(userQueryDto);
        });
    });

    describe('findById', () => {
        it('should return an user by id', async () => {
            const id = 1;
            const user = await UserFactory.attrs<IUser>('User');

            const userRepositoryFindByIdSpy = jest
                .spyOn(userRepository, 'findOne')
                .mockResolvedValue(user);

            const returnedUser = await userService.findById(id);

            expect(returnedUser).toEqual(user);

            expect(userRepositoryFindByIdSpy).toHaveBeenCalledTimes(1);
            expect(userRepositoryFindByIdSpy).toHaveBeenCalledWith(id);
        });

        it('should throw an error on user not found and flag enabled', async () => {
            const id = 1;

            const userRepositoryFindByIdSpy = jest
                .spyOn(userRepository, 'findOne')
                .mockResolvedValue(undefined);

            try {
                await userService.findById(id);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect(error.message).toEqual(`User with id ${id} not found`);
            } finally {
                expect(userRepositoryFindByIdSpy).toHaveBeenCalledTimes(1);
                expect(userRepositoryFindByIdSpy).toHaveBeenCalledWith(id);
            }
        });

        it("shouldn't throw an error on user not found and flag disabled", async () => {
            const id = 1;

            const userRepositoryFindByIdSpy = jest
                .spyOn(userRepository, 'findOne')
                .mockResolvedValue(undefined);

            const returnedUser = await userService.findById(id, false);

            expect(returnedUser).not.toBeDefined();

            expect(userRepositoryFindByIdSpy).toHaveBeenCalledTimes(1);
            expect(userRepositoryFindByIdSpy).toHaveBeenCalledWith(id);
        });
    });

    describe('findByEmail', () => {
        it('should return an user by email', async () => {
            const email = 'mateusrlopez@gmail.com';
            const user = await UserFactory.attrs<IUser>('User');

            const userRepositoryFindByEmailSpy = jest
                .spyOn(userRepository, 'findByEmail')
                .mockResolvedValue(user);

            const returnedUser = await userService.findByEmail(email);

            expect(returnedUser).toEqual(user);

            expect(userRepositoryFindByEmailSpy).toHaveBeenCalledTimes(1);
            expect(userRepositoryFindByEmailSpy).toHaveBeenCalledWith(email);
        });

        it('should throw an error on user not found and flag enabled', async () => {
            const email = 'mateusrlopez@gmail.com';

            const userRepositoryFindByEmailSpy = jest
                .spyOn(userRepository, 'findByEmail')
                .mockResolvedValue(undefined);

            try {
                await userService.findByEmail(email);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect(error.message).toEqual(`User with email ${email} not found`);
            } finally {
                expect(userRepositoryFindByEmailSpy).toHaveBeenCalledTimes(1);
                expect(userRepositoryFindByEmailSpy).toHaveBeenCalledWith(email);
            }
        });

        it("shouldn't throw an error on user not found and flag disabled", async () => {
            const email = 'mateusrlopez@gmail.com';

            const userRepositoryFindByEmailSpy = jest
                .spyOn(userRepository, 'findByEmail')
                .mockResolvedValue(undefined);

            const returnedUser = await userService.findByEmail(email, false);

            expect(returnedUser).not.toBeDefined();

            expect(userRepositoryFindByEmailSpy).toHaveBeenCalledTimes(1);
            expect(userRepositoryFindByEmailSpy).toHaveBeenCalledWith(email);
        });
    });

    describe('updateById', () => {
        it('should return the updated user', async () => {
            const id = 1;
            const updateUserDto = await UserFactory.attrs<IUpdateUser>('UpdateUserDto');
            const user = await UserFactory.attrs<IUser>('User');

            const userRepositoryFindByIdSpy = jest
                .spyOn(userRepository, 'findOne')
                .mockResolvedValue(user);

            const userRepositorySaveSpy = jest
                .spyOn(userRepository, 'save')
                .mockResolvedValue(user);

            const updatedUser = await userService.updateById(id, updateUserDto);

            expect(updatedUser).toEqual(user);

            expect(userRepositoryFindByIdSpy).toHaveBeenCalledTimes(1);
            expect(userRepositoryFindByIdSpy).toHaveBeenCalledWith(id);

            expect(userRepositorySaveSpy).toHaveBeenCalledTimes(1);
            expect(userRepositorySaveSpy).toHaveBeenCalledWith({ ...user, ...updateUserDto });
        });

        it('should throw an error on user not found', async () => {
            const id = 1;
            const updateUserDto = await UserFactory.attrs<IUpdateUser>('UpdateUserDto');
            const user = await UserFactory.attrs<IUser>('User');

            const userRepositoryFindByIdSpy = jest
                .spyOn(userRepository, 'findOne')
                .mockResolvedValue(undefined);

            const userRepositorySaveSpy = jest
                .spyOn(userRepository, 'save')
                .mockResolvedValue(user);

            try {
                await userService.updateById(id, updateUserDto);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect(error.message).toEqual(`User with id ${id} not found`);
            } finally {
                expect(userRepositoryFindByIdSpy).toHaveBeenCalledTimes(1);
                expect(userRepositoryFindByIdSpy).toHaveBeenCalledWith(id);

                expect(userRepositorySaveSpy).toHaveBeenCalledTimes(0);
            }
        });
    });

    describe('updateByEmail', () => {
        it('should return the updated user', async () => {
            const email = 'mateusrlopez@gmail.com';
            const updateUserDto = await UserFactory.attrs<IUpdateUser>('UpdateUserDto');
            const user = await UserFactory.attrs<IUser>('User');

            const userRepositoryFindByEmailSpy = jest
                .spyOn(userRepository, 'findByEmail')
                .mockResolvedValue(user);

            const userRepositorySaveSpy = jest
                .spyOn(userRepository, 'save')
                .mockResolvedValue(user);

            const updatedUser = await userService.updateByEmail(email, updateUserDto);

            expect(updatedUser).toEqual(user);

            expect(userRepositoryFindByEmailSpy).toHaveBeenCalledTimes(1);
            expect(userRepositoryFindByEmailSpy).toHaveBeenCalledWith(email);

            expect(userRepositorySaveSpy).toHaveBeenCalledTimes(1);
            expect(userRepositorySaveSpy).toHaveBeenCalledWith({ ...user, ...updateUserDto });
        });

        it('should throw an error on user not found', async () => {
            const email = 'mateusrlopez@gmail.com';
            const updateUserDto = await UserFactory.attrs<IUpdateUser>('UpdateUserDto');
            const user = await UserFactory.attrs<IUser>('User');

            const userRepositoryFindByEmailSpy = jest
                .spyOn(userRepository, 'findByEmail')
                .mockResolvedValue(undefined);

            const userRepositorySaveSpy = jest
                .spyOn(userRepository, 'save')
                .mockResolvedValue(user);

            try {
                await userService.updateByEmail(email, updateUserDto);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect(error.message).toEqual(`User with email ${email} not found`);
            } finally {
                expect(userRepositoryFindByEmailSpy).toHaveBeenCalledTimes(1);
                expect(userRepositoryFindByEmailSpy).toHaveBeenCalledWith(email);

                expect(userRepositorySaveSpy).toHaveBeenCalledTimes(0);
            }
        });
    });

    describe('remove', () => {
        it('should return undefined', async () => {
            const id = 1;
            const user = await UserFactory.attrs<IUser>('User');

            const userRepositoryFindByIdSpy = jest
                .spyOn(userRepository, 'findOne')
                .mockResolvedValue(user);

            const userRepositoryRemoveSpy = jest
                .spyOn(userRepository, 'remove')
                .mockResolvedValue(undefined);

            const result = await userService.remove(id);

            expect(result).not.toBeDefined();

            expect(userRepositoryFindByIdSpy).toHaveBeenCalledTimes(1);
            expect(userRepositoryFindByIdSpy).toHaveBeenCalledWith(id);

            expect(userRepositoryRemoveSpy).toHaveBeenCalledTimes(1);
            expect(userRepositoryRemoveSpy).toHaveBeenCalledWith(user);
        });

        it('should throw an error on user not found', async () => {
            const id = 1;

            const userRepositoryFindByIdSpy = jest
                .spyOn(userRepository, 'findOne')
                .mockResolvedValue(undefined);

            const userRepositoryRemoveSpy = jest
                .spyOn(userRepository, 'remove')
                .mockResolvedValue(undefined);

            try {
                await userService.remove(id);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect(error.message).toEqual(`User with id ${id} not found`);
            } finally {
                expect(userRepositoryFindByIdSpy).toHaveBeenCalledTimes(1);
                expect(userRepositoryFindByIdSpy).toHaveBeenCalledWith(id);

                expect(userRepositoryRemoveSpy).toHaveBeenCalledTimes(0);
            }
        });
    });
});
