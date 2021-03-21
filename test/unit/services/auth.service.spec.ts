import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';

import { AuthService } from '@auth/auth.service';
import { UserFactory } from '@factories/user.factory';
import { UserRepositoryMock } from '@mocks/repositories/user.repository.mock';
import { JWTServiceMock } from '@mocks/services/jwt.service.mock';
import * as hash from '@shared/helpers/hash.helper';
import { ICreateUser } from '@user/interfaces/create-user.interface';
import { IUser } from '@user/interfaces/user.interface';
import { UserRepository } from '@user/repositories/user.repository';
import { UserService } from '@user/user.service';

describe('AuthService', () => {
    let authService: AuthService;
    let jwtService: JwtService;
    let userRepository: UserRepository;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                AuthService,
                UserService,
                {
                    provide: UserRepository,
                    useClass: UserRepositoryMock,
                },
                {
                    provide: JwtService,
                    useClass: JWTServiceMock,
                },
            ],
        }).compile();

        authService = moduleRef.get<AuthService>(AuthService);
        jwtService = moduleRef.get<JwtService>(JwtService);
        userRepository = moduleRef.get<UserRepository>(UserRepository);
    });

    describe('register', () => {
        it('should return the created user', async () => {
            const user = await UserFactory.attrs<IUser>('User');
            const createUserDto = await UserFactory.attrs<ICreateUser>('CreateUserDto');

            const userRepositorySaveSpy = jest
                .spyOn(userRepository, 'save')
                .mockResolvedValue(user);

            const returnedUser = await authService.register(createUserDto);

            expect(returnedUser).toEqual(user);

            expect(userRepositorySaveSpy).toHaveBeenCalledTimes(1);
            expect(userRepositorySaveSpy).toHaveBeenCalledWith(createUserDto);
        });
    });

    describe('validate', () => {
        it('should return the validated user', async () => {
            const email = 'mateusrlopez@gmail.com';
            const password = 'test';
            const user = await UserFactory.attrs<IUser>('User', {
                password: hash.encrypt(password),
            });

            const userRepositoryFindByEmailSpy = jest
                .spyOn(userRepository, 'findByEmail')
                .mockResolvedValue(user);

            const returnedUser = await authService.validate(email, password);

            expect(returnedUser).toEqual(user);

            expect(userRepositoryFindByEmailSpy).toHaveBeenCalledTimes(1);
            expect(userRepositoryFindByEmailSpy).toHaveBeenCalledWith(email);
        });

        it('should thrown an error on user not found', async () => {
            const email = 'mateusrlopez@gmail.com';
            const password = 'test';

            const userRepositoryFindByEmailSpy = jest
                .spyOn(userRepository, 'findByEmail')
                .mockResolvedValue(undefined);

            try {
                await authService.validate(email, password);
            } catch (error) {
                expect(error).toBeInstanceOf(UnauthorizedException);
                expect(error.message).toEqual('Invalid credentials');
            } finally {
                expect(userRepositoryFindByEmailSpy).toHaveBeenCalledTimes(1);
                expect(userRepositoryFindByEmailSpy).toHaveBeenCalledWith(email);
            }
        });

        it('should throw an error on invalid password', async () => {
            const email = 'mateusrlopez@gmail.com';
            const password = 'test';
            const user = await UserFactory.attrs<IUser>('User', {
                password,
            });

            const userRepositoryFindByEmailSpy = jest
                .spyOn(userRepository, 'findByEmail')
                .mockResolvedValue(user);

            try {
                await authService.validate(email, password);
            } catch (error) {
                expect(error).toBeInstanceOf(UnauthorizedException);
                expect(error.message).toEqual('Invalid credentials');
            } finally {
                expect(userRepositoryFindByEmailSpy).toHaveBeenCalledTimes(1);
                expect(userRepositoryFindByEmailSpy).toHaveBeenCalledWith(email);
            }
        });
    });

    describe('retrieveUser', () => {
        it('should return an user by email', async () => {
            const email = 'mateusrlopez@gmail.com';
            const user = await UserFactory.attrs<IUser>('User');

            const userRepositoryFindByEmailSpy = jest
                .spyOn(userRepository, 'findByEmail')
                .mockResolvedValue(user);

            const returnedUser = await authService.retrieveUser(email);

            expect(returnedUser).toEqual(user);

            expect(userRepositoryFindByEmailSpy).toHaveBeenCalledTimes(1);
            expect(userRepositoryFindByEmailSpy).toHaveBeenCalledWith(email);
        });

        it('should throw an error on user not found', async () => {
            const email = 'mateusrlopez@gmail.com';

            const userRepositoryFindByEmailSpy = jest
                .spyOn(userRepository, 'findByEmail')
                .mockResolvedValue(undefined);

            try {
                await authService.retrieveUser(email);
            } catch (error) {
                expect(error).toBeInstanceOf(UnauthorizedException);
                expect(error.message).toEqual('Invalid credentials');
            } finally {
                expect(userRepositoryFindByEmailSpy).toHaveBeenCalledTimes(1);
                expect(userRepositoryFindByEmailSpy).toHaveBeenCalledWith(email);
            }
        });
    });

    describe('assignToken', () => {
        it('should return the token by email', async () => {
            const user = await UserFactory.attrs<IUser>('User');
            const { email } = user;

            const jwtServiceSignAsyncSpy = jest
                .spyOn(jwtService, 'signAsync')
                .mockResolvedValue(email);

            const returnedValue = await authService.assignToken(user);

            expect(returnedValue).toEqual(email);

            expect(jwtServiceSignAsyncSpy).toHaveBeenCalledTimes(1);
            expect(jwtServiceSignAsyncSpy).toHaveBeenCalledWith(email);
        });
    });
});
