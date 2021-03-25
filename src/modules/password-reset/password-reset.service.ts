import { Injectable, NotFoundException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
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
        await this.passwordResetRepository.createAndSave(requestPasswordResetDto);
    }

    public async resetPassword(resetPasswordDto: IResetPassword): Promise<IUser> {
        const { token, userEmail, password } = resetPasswordDto;
        const passwordReset = await this.passwordResetRepository.findByUserEmailAndToken(
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

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    public async deleteExpiredRequests(): Promise<void> {
        await this.passwordResetRepository.deleteExpiredRequests();
    }
}
