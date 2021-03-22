import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { PasswordResetFactory } from '@factories/password-reset.factory';
import { UserFactory } from '@factories/user.factory';
import { PasswordResetRepositoryMock } from '@mocks/repositories/password-reset.repository.mock';
import { UserRepositoryMock } from '@mocks/repositories/user.repository.mock';
import { IPasswordReset } from '@password-reset/interfaces/password-reset.interface';
import { IRequestPasswordReset } from '@password-reset/interfaces/request-password-reset.interface';
import { IResetPassword } from '@password-reset/interfaces/reset-password.interface';
import { PasswordResetService } from '@password-reset/password-reset.service';
import { PasswordResetRepository } from '@password-reset/repositories/password-reset.repository';
import { IUser } from '@user/interfaces/user.interface';
import { UserRepository } from '@user/repositories/user.repository';
import { UserService } from '@user/user.service';

describe('PasswordResetService', () => {
    let passwordResetService: PasswordResetService;
    let passwordResetRepository: PasswordResetRepository;
    let userRepository: UserRepository;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                PasswordResetService,
                UserService,
                {
                    provide: PasswordResetRepository,
                    useClass: PasswordResetRepositoryMock,
                },
                {
                    provide: UserRepository,
                    useClass: UserRepositoryMock,
                },
            ],
        }).compile();

        passwordResetService = moduleRef.get<PasswordResetService>(PasswordResetService);
        passwordResetRepository = moduleRef.get<PasswordResetRepository>(PasswordResetRepository);
        userRepository = moduleRef.get<UserRepository>(UserRepository);
    });

    it('should be defined', () => {
        expect(passwordResetService).toBeDefined();
    });

    describe('createPasswordResetRequest', () => {
        it('should return undefined', async () => {
            const passwordReset = await PasswordResetFactory.attrs<IPasswordReset>('PasswordReset');
            const requestPasswordResetDto = await PasswordResetFactory.attrs<IRequestPasswordReset>(
                'RequestPasswordResetDto'
            );

            const passwordResetRepositorySaveSpy = jest
                .spyOn(passwordResetRepository, 'save')
                .mockResolvedValue(passwordReset);

            const returnedValue = await passwordResetService.createPasswordResetRequest(
                requestPasswordResetDto
            );

            expect(returnedValue).not.toBeDefined();

            expect(passwordResetRepositorySaveSpy).toHaveBeenCalledTimes(1);
            expect(passwordResetRepositorySaveSpy).toHaveBeenCalledWith(requestPasswordResetDto);
        });
    });

    describe('resetPassword', () => {
        it('should return the updated user', async () => {
            const user = await UserFactory.attrs<IUser>('User');
            const passwordReset = await PasswordResetFactory.attrs<IPasswordReset>('PasswordReset');
            const resetPasswordDto = await PasswordResetFactory.attrs<IResetPassword>(
                'ResetPasswordDto'
            );
            const { token, userEmail, password } = resetPasswordDto;

            const passwordResetRepositoryFindByUserEmailTokenSpy = jest
                .spyOn(passwordResetRepository, 'findByUserEmailToken')
                .mockResolvedValue(passwordReset);

            const passwordResetRepositoryRemoveSpy = jest
                .spyOn(passwordResetRepository, 'remove')
                .mockResolvedValue(undefined);

            const userRepositoryFindByEmailSpy = jest
                .spyOn(userRepository, 'findByEmail')
                .mockResolvedValue(user);

            const userRepositorySaveSpy = jest
                .spyOn(userRepository, 'save')
                .mockResolvedValue(user);

            const returnedUser = await passwordResetService.resetPassword(resetPasswordDto);

            expect(returnedUser).toEqual(user);

            expect(passwordResetRepositoryFindByUserEmailTokenSpy).toHaveBeenCalledTimes(1);
            expect(passwordResetRepositoryFindByUserEmailTokenSpy).toHaveBeenCalledWith(
                userEmail,
                token
            );

            expect(userRepositoryFindByEmailSpy).toHaveBeenCalledTimes(1);
            expect(userRepositoryFindByEmailSpy).toHaveBeenCalledWith(userEmail);

            expect(userRepositorySaveSpy).toHaveBeenCalledTimes(1);
            expect(userRepositorySaveSpy).toHaveBeenCalledWith({ ...user, password });

            expect(passwordResetRepositoryRemoveSpy).toHaveBeenCalledTimes(1);
            expect(passwordResetRepositoryRemoveSpy).toHaveBeenCalledWith(passwordReset);
        });

        it('should throw an error on password-reset not found', async () => {
            const user = await UserFactory.attrs<IUser>('User');
            const resetPasswordDto = await PasswordResetFactory.attrs<IResetPassword>(
                'ResetPasswordDto'
            );
            const { token, userEmail } = resetPasswordDto;

            const passwordResetRepositoryFindByUserEmailTokenSpy = jest
                .spyOn(passwordResetRepository, 'findByUserEmailToken')
                .mockResolvedValue(undefined);

            const passwordResetRepositoryRemoveSpy = jest
                .spyOn(passwordResetRepository, 'remove')
                .mockResolvedValue(undefined);

            const userRepositoryFindByEmailSpy = jest
                .spyOn(userRepository, 'findByEmail')
                .mockResolvedValue(user);

            const userRepositorySaveSpy = jest
                .spyOn(userRepository, 'save')
                .mockResolvedValue(user);

            try {
                await passwordResetService.resetPassword(resetPasswordDto);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect(error.message).toEqual(
                    `Password reset request with email ${userEmail} and token ${token} not found`
                );
            } finally {
                expect(passwordResetRepositoryFindByUserEmailTokenSpy).toHaveBeenCalledTimes(1);
                expect(passwordResetRepositoryFindByUserEmailTokenSpy).toHaveBeenCalledWith(
                    userEmail,
                    token
                );

                expect(userRepositoryFindByEmailSpy).toHaveBeenCalledTimes(0);

                expect(userRepositorySaveSpy).toHaveBeenCalledTimes(0);

                expect(passwordResetRepositoryRemoveSpy).toHaveBeenCalledTimes(0);
            }
        });

        it('should throw an error on user not found', async () => {
            const user = await UserFactory.attrs<IUser>('User');
            const passwordReset = await PasswordResetFactory.attrs<IPasswordReset>('PasswordReset');
            const resetPasswordDto = await PasswordResetFactory.attrs<IResetPassword>(
                'ResetPasswordDto'
            );
            const { token, userEmail } = resetPasswordDto;

            const passwordResetRepositoryFindByUserEmailTokenSpy = jest
                .spyOn(passwordResetRepository, 'findByUserEmailToken')
                .mockResolvedValue(passwordReset);

            const passwordResetRepositoryRemoveSpy = jest
                .spyOn(passwordResetRepository, 'remove')
                .mockResolvedValue(undefined);

            const userRepositoryFindByEmailSpy = jest
                .spyOn(userRepository, 'findByEmail')
                .mockResolvedValue(undefined);

            const userRepositorySaveSpy = jest
                .spyOn(userRepository, 'save')
                .mockResolvedValue(user);

            try {
                await passwordResetService.resetPassword(resetPasswordDto);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect(error.message).toEqual(`User with email ${userEmail} not found`);
            } finally {
                expect(passwordResetRepositoryFindByUserEmailTokenSpy).toHaveBeenCalledTimes(1);
                expect(passwordResetRepositoryFindByUserEmailTokenSpy).toHaveBeenCalledWith(
                    userEmail,
                    token
                );

                expect(userRepositoryFindByEmailSpy).toHaveBeenCalledTimes(1);
                expect(userRepositoryFindByEmailSpy).toHaveBeenCalledWith(userEmail);

                expect(userRepositorySaveSpy).toHaveBeenCalledTimes(0);

                expect(passwordResetRepositoryRemoveSpy).toHaveBeenCalledTimes(0);
            }
        });
    });

    describe('deleteExpiredRequests', () => {
        it('should return undefined', async () => {
            const passwordResetRepositoryDeleteExpiredRequestsSpy = jest
                .spyOn(passwordResetRepository, 'deleteExpiredRequests')
                .mockResolvedValue(undefined);

            const returnedValue = await passwordResetService.deleteExpiredRequests();

            expect(returnedValue).not.toBeDefined();

            expect(passwordResetRepositoryDeleteExpiredRequestsSpy).toHaveBeenCalledTimes(1);
        });
    });
});
