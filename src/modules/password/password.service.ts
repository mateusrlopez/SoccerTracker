import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { UserService } from "@user/user.service";

import { PasswordResetRepository } from "./repositories/password.repository";

@Injectable()
export class PasswordService {
    constructor(
        @InjectRepository(PasswordResetRepository)
        private readonly passwordResetRepository: PasswordResetRepository,
        private readonly userService: UserService
    ) {}
}
