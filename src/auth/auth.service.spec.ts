import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { UnauthorizedException } from '@nestjs/common';
import { UserNotExistsException } from '../user/exceptions/not-exists.exceptions';
import { IUser } from '../user/entities/user.entity';
import { IUserService } from '../user/user.service';
import { IAuthService, IJwtService } from './auth.service';
import { ICreateUser } from '../user/dto/create-user.dto';
import { AuthServiceProvider } from './auth.providers';

describe('AuthService', () => {
    let authService: IAuthService;
    let userService: IUserService;
    let jwtService: IJwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: 'JWT_SERVICE',
                    useValue: {
                        signAsync: () => {},
                    },
                },
                {
                    provide: 'USER_SERVICE',
                    useValue: {
                        create: () => {},
                        findOneByEmail: () => {},
                    },
                },
                AuthServiceProvider,
            ],
        }).compile();

        authService = module.get<IAuthService>('AUTH_SERVICE');
        userService = module.get<IUserService>('USER_SERVICE');
        jwtService = module.get<IJwtService>('JWT_SERVICE');
    });

    it('should be defined', () => {
        expect(authService).toBeDefined();
    });

    describe('Register', () => {
        it('should return the created user with hashed password', async () => {
            const createUserDto: ICreateUser = {
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                birthdate: faker.date.birthdate(),
            };

            jest.spyOn(userService, 'create').mockImplementation(async (data: ICreateUser) => ({
                id: faker.string.uuid(),
                ...data,
            }));

            const created = await authService.register(createUserDto);

            expect(userService.create).toHaveBeenCalledTimes(1);
            expect(userService.create).toHaveBeenCalledWith({
                ...createUserDto,
                password: created.password,
            });

            expect(created.password).not.toStrictEqual(createUserDto.password);
            expect(compareSync(createUserDto.password, created.password)).toBeTruthy();
        });
    });

    describe('ValidateSignIn', () => {
        it('should return the validated user when login is valid', async () => {
            const email = faker.internet.email();
            const password = faker.internet.password();

            const user: IUser = {
                id: faker.string.uuid(),
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email,
                birthdate: faker.date.birthdate(),
                password: hashSync(password, genSaltSync(10)),
            };

            jest.spyOn(userService, 'findOneByEmail').mockResolvedValue(user);

            await expect(authService.validateSignIn(email, password)).resolves.toStrictEqual(user);

            expect(userService.findOneByEmail).toBeCalledTimes(1);
            expect(userService.findOneByEmail).toBeCalledWith(email);
        });

        it('should throw an error when an user with the given email is not found', async () => {
            const email = faker.internet.email();
            const password = faker.internet.password();

            jest.spyOn(userService, 'findOneByEmail').mockImplementation(() => {
                throw new UserNotExistsException('');
            });

            await expect(authService.validateSignIn(email, password)).rejects.toThrowError(
                UnauthorizedException
            );

            expect(userService.findOneByEmail).toBeCalledTimes(1);
            expect(userService.findOneByEmail).toBeCalledWith(email);
        });

        it('should throw an error when the password is invalid', async () => {
            const email = faker.internet.email();
            const password = faker.internet.password();

            const user: IUser = {
                id: faker.string.uuid(),
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email,
                birthdate: faker.date.birthdate(),
                password,
            };

            jest.spyOn(userService, 'findOneByEmail').mockResolvedValue(user);

            await expect(authService.validateSignIn(email, password)).rejects.toThrowError(
                UnauthorizedException
            );

            expect(userService.findOneByEmail).toBeCalledTimes(1);
            expect(userService.findOneByEmail).toBeCalledWith(email);
        });
    });

    describe('AssignToken', () => {
        it('should return the assigned token', async () => {
            const token = faker.string.sample(20);

            const user: IUser = {
                id: faker.string.uuid(),
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                birthdate: faker.date.birthdate(),
                password: faker.internet.password(),
            };

            jest.spyOn(jwtService, 'signAsync').mockResolvedValue(token);

            await expect(authService.assignToken(user)).resolves.toStrictEqual(token);

            expect(jwtService.signAsync).toBeCalledTimes(1);
            expect(jwtService.signAsync).toBeCalledWith(user.email);
        });
    });

    describe('ValidateToken', () => {
        it('should return the retrieved user based on payload', async () => {
            const email = faker.internet.email();

            const user: IUser = {
                id: faker.string.uuid(),
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email,
                birthdate: faker.date.birthdate(),
                password: faker.internet.password(),
            };

            jest.spyOn(userService, 'findOneByEmail').mockResolvedValue(user);

            await expect(authService.validateToken(email)).resolves.toStrictEqual(user);

            expect(userService.findOneByEmail).toBeCalledTimes(1);
            expect(userService.findOneByEmail).toBeCalledWith(email);
        });

        it('should throw an error when an user with the given email is not found', async () => {
            const email = faker.internet.email();

            jest.spyOn(userService, 'findOneByEmail').mockImplementation(() => {
                throw new UserNotExistsException('');
            });

            await expect(authService.validateToken(email)).rejects.toThrowError(
                UnauthorizedException
            );

            expect(userService.findOneByEmail).toBeCalledTimes(1);
            expect(userService.findOneByEmail).toBeCalledWith(email);
        });
    });
});
