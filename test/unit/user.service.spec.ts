import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { createUserPayload, updateUserPayload } from '@factories/user.factory';
import { mockUserRepository } from '@mocks/repositories/user.repository.mock';
import { UserRepository } from '@user/repositories/user.repository';
import { UserService } from '@user/user.service';

describe('UserService', () => {
    let userService: UserService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(UserRepository),
                    useValue: mockUserRepository,
                },
            ],
        }).compile();

        userService = moduleRef.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(userService).toBeDefined();
    });

    describe('create', () => {
        it('should return the user', async () => {
            const user = createUserPayload;
            const createdUser = await userService.create(createUserPayload);

            expect(createdUser).toMatchObject(user);
            expect(mockUserRepository.save).toHaveBeenCalledTimes(1);
        });
    });

    describe('findAll', () => {
        it('should return all users', async () => {
            const users = await userService.findAll({});

            expect(users).toHaveLength(4);
            expect(mockUserRepository.find).toHaveBeenCalledTimes(1);
        });

        it('should filter the users by teamId', async () => {
            const users = await userService.findAll({ teamId: 1 });

            expect(users).toHaveLength(2);
            users.forEach(user => expect(user).toMatchObject({ teamId: 1 }));
            expect(mockUserRepository.find).toHaveBeenCalledTimes(1);
        });
    });

    describe('findByEmail', () => {
        it('should return user by email', async () => {
            const user = await userService.findByEmail('mateusrlopez@gmail.com');

            expect(user).toMatchObject({ email: 'mateusrlopez@gmail.com' });
            expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(1);
        });

        it('should throw an error on user not found', () => {
            expect(userService.findByEmail('notFound')).rejects.toBeInstanceOf(NotFoundException);
            expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(1);
        });
    });

    describe('findById', () => {
        it('should return user by id', async () => {
            const user = await userService.findById(1);

            expect(user).toMatchObject({ id: 1 });
            expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
        });

        it('should throw an error on user not found', () => {
            expect(userService.findById(-1)).rejects.toBeInstanceOf(NotFoundException);
            expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
        });
    });

    describe('updateById', () => {
        it('should return updated user by id', async () => {
            const user = updateUserPayload;
            const updatedUser = await userService.updateById(1, user);

            expect(updatedUser).toMatchObject({ id: 1, ...updatedUser });
            expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
            expect(mockUserRepository.save).toHaveBeenCalledTimes(1);
        });

        it('should throw an error on user not found', () => {
            expect(userService.updateById(-1, {})).rejects.toBeInstanceOf(NotFoundException);
            expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
            expect(mockUserRepository.save).toHaveBeenCalledTimes(0);
        });
    });

    describe('updateByEmail', () => {
        it('should return updated user by email', async () => {
            const user = updateUserPayload;
            const updatedUser = await userService.updateByEmail('mateusrlopez@gmail.com', user);

            expect(updatedUser).toMatchObject({ email: 'mateusrlopez@gmail.com', ...updatedUser });
            expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(1);
            expect(mockUserRepository.save).toHaveBeenCalledTimes(1);
        });

        it('should throw an error on user not found', () => {
            expect(userService.updateByEmail('notFound', {})).rejects.toBeInstanceOf(
                NotFoundException
            );
            expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(1);
            expect(mockUserRepository.save).toHaveBeenCalledTimes(0);
        });
    });

    describe('remove', () => {
        it('should return undefined', async () => {
            const result = await userService.remove(1);

            expect(result).not.toBeDefined();
            expect(mockUserRepository.remove).toHaveBeenCalledTimes(1);
        });

        it('should throw an error on user not found', () => {
            expect(userService.remove(-1)).rejects.toBeInstanceOf(NotFoundException);
            expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
            expect(mockUserRepository.remove).toHaveBeenCalledTimes(0);
        });
    });
});
