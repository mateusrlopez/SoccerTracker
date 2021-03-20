import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { IUser } from '@user/interfaces/user.interface';
import { UserService } from '@user/user.service';

import { IRequestPasswordReset } from './interfaces/request-password-reset.interface';
import { IResetPassword } from './interfaces/reset-password.interface';
import { PasswordResetRepository } from './repositories/password-reset.repository';

@Injectable()
export class PasswordResetService {
    constructor(
        @InjectRepository(PasswordResetRepository)
        private readonly passwordResetRepository: PasswordResetRepository,
        private readonly userService: UserService
    ) {}

    public async createPasswordResetRequest(
        requestPasswordResetDto: IRequestPasswordReset
    ): Promise<void> {
        await this.passwordResetRepository.save(requestPasswordResetDto);
    }

    public async resetPassword(resetPasswordDto: IResetPassword): Promise<IUser> {
        const { token, userEmail, password } = resetPasswordDto;
        const passwordReset = await this.passwordResetRepository.findByUserEmailToken(
            userEmail,
            token
        );

        if (typeof passwordReset === 'undefined') {
            throw new NotFoundException(
                `Password reset request with email ${userEmail} and token ${token} not found`
            );
        }

        const user = await this.userService.updateByEmail(userEmail, { password });
        await this.passwordResetRepository.remove(passwordReset);

        return user;
    }
}
