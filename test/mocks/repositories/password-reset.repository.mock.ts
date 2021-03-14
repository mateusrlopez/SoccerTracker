import { passwordResetsArray } from '@factories/password-reset.factory';
import { IRequestPasswordReset } from '@password-reset/interfaces/request-password-reset.interface';

export const mockPasswordResetRepository = {
    findByUserEmail: jest
        .fn()
        .mockImplementation((userEmail: string) =>
            passwordResetsArray.find(passwordReset => passwordReset.userEmail === userEmail)
        ),
    remove: jest.fn().mockReturnValue(null),
    save: jest
        .fn()
        .mockImplementation(
            (requestPasswordResetDto: IRequestPasswordReset) => requestPasswordResetDto
        ),
};
