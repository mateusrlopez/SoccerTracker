import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import {
    invalidEmailResetPasswordPayload,
    invalidTokenResetPasswordPayload,
    requestPasswordResetPayload,
    resetPasswordPayload,
} from '@factories/password-reset.factory';
import { mockPasswordResetRepository } from '@mocks/repositories/password-reset.repository.mock';
import { mockUserRepository } from '@mocks/repositories/user.repository.mock';
import { mockUserService } from '@mocks/services/user.service.mock';
import { PasswordResetService } from '@password-reset/password-reset.service';
import { PasswordResetRepository } from '@password-reset/repositories/password-reset.repository';
import { UserService } from '@user/user.service';

describe('PasswordResetService', () => {
    let passwordResetService: PasswordResetService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                PasswordResetService,
                {
                    provide: getRepositoryToken(PasswordResetRepository),
                    useValue: mockPasswordResetRepository,
                },
                {
                    provide: UserService,
                    useValue: mockUserService,
                },
            ],
        }).compile();

        passwordResetService = moduleRef.get<PasswordResetService>(PasswordResetService);
    });

    it('should be defined', () => {
        expect(passwordResetService).toBeDefined();
    });

    describe('resetPassword', () => {
        it('should return the updated user by email', async () => {
            const payload = resetPasswordPayload;
            const user = await passwordResetService.resetPassword(payload);

            expect(user).toMatchObject({ email: payload.userEmail });
            expect(mockPasswordResetRepository.findByUserEmail).toHaveBeenCalledTimes(1);
            expect(mockPasswordResetRepository.remove).toHaveBeenCalledTimes(1);
            expect(mockUserService.updateByEmail).toHaveBeenCalledTimes(1);
            expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(1);
            expect(mockUserRepository.save).toHaveBeenCalledTimes(1);
        });

        it('should throw an error on invalid token', () => {
            expect(
                passwordResetService.resetPassword(invalidTokenResetPasswordPayload)
            ).rejects.toBeInstanceOf(NotFoundException);
            expect(mockPasswordResetRepository.findByUserEmail).toHaveBeenCalledTimes(1);
            expect(mockPasswordResetRepository.remove).toHaveBeenCalledTimes(0);
            expect(mockUserService.updateByEmail).toHaveBeenCalledTimes(0);
            expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(0);
            expect(mockUserRepository.save).toHaveBeenCalledTimes(0);
        });

        it('should throw an error on password-reset not found by email', () => {
            expect(
                passwordResetService.resetPassword(invalidEmailResetPasswordPayload)
            ).rejects.toBeInstanceOf(NotFoundException);
            expect(mockPasswordResetRepository.findByUserEmail).toHaveBeenCalledTimes(1);
            expect(mockPasswordResetRepository.remove).toHaveBeenCalledTimes(0);
            expect(mockUserService.updateByEmail).toHaveBeenCalledTimes(0);
            expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(0);
            expect(mockUserRepository.save).toHaveBeenCalledTimes(0);
        });
    });

    describe('createPasswordResetRequest', () => {
        it('should return undefined', async () => {
            const result = await passwordResetService.createPasswordResetRequest(
                requestPasswordResetPayload
            );

            expect(result).not.toBeDefined();
            expect(mockPasswordResetRepository.save).toHaveBeenCalledTimes(1);
        });
    });
});
