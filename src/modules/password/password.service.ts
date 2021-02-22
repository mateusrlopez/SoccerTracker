import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { IUser } from "@user/interfaces/user.interface";
import { UserService } from "@user/user.service";

import { IRequestPasswordResetDto } from "./interfaces/request-password-reset-dto.interface";
import { IResetPasswordDto } from "./interfaces/reset-password-dto.interface";
import { PasswordResetRepository } from "./repositories/password.repository";

@Injectable()
export class PasswordService {
    constructor(
        @InjectRepository(PasswordResetRepository)
        private readonly passwordResetRepository: PasswordResetRepository,
        private readonly userService: UserService
    ) {}

    public async resetPassword(resetPasswordResetDto: IResetPasswordDto): Promise<IUser> {
        const { email, password } = resetPasswordResetDto;

        await this.passwordResetRepository.delete({ email });

        return this.userService.updateByEmail(email, { password });
    }

    public async createPasswordResetRequest(
        requestPasswordResetDto: IRequestPasswordResetDto
    ): Promise<void> {
        await this.passwordResetRepository.save(requestPasswordResetDto);
    }
}
