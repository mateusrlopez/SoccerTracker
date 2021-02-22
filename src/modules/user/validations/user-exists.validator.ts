import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

import { UserRepository } from "@user/repositories/user.repository";

@ValidatorConstraint({ async: true, name: "UserExists" })
@Injectable()
export class UserExists implements ValidatorConstraintInterface {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository
    ) {}

    public async validate(email: string): Promise<boolean> {
        const user = await this.userRepository.findByEmail(email);
        return typeof user !== "undefined";
    }

    public defaultMessage(): string {
        return "A user with e-mail $value doesn't exists";
    }
}
