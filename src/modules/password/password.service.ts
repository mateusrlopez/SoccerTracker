import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { IUser } from '@user/interfaces/user.interface';
import { UserService } from '@user/user.service';

import { IRequestPasswordReset } from './interfaces/request-password-reset.interface';
import { IResetPassword } from './interfaces/reset-password.interface';
import { PasswordResetRepository } from './repositories/password-reset.repository';

@Injectable()
export class PasswordService {
    constructor(
        @InjectRepository(PasswordResetRepository)
        private readonly passwordResetRepository: PasswordResetRepository,
        private readonly userService: UserService
    ) {}

    public async resetPassword(resetPasswordDto: IResetPassword): Promise<IUser> {
        const { userEmail, password } = resetPasswordDto;

        await this.passwordResetRepository.delete({ userEmail });

        return this.userService.updateByEmail(userEmail, { password });
    }

    public async createPasswordResetRequest(
        requestPasswordResetDto: IRequestPasswordReset
    ): Promise<void> {
        await this.passwordResetRepository.save(requestPasswordResetDto);
    }
}
