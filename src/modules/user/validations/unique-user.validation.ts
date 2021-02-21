import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

import { UserRepository } from "@user/repositories/user.repository";

@ValidatorConstraint({ async: true, name: "UniqueUser" })
@Injectable()
export class UniqueUser implements ValidatorConstraintInterface {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository
    ) {}

    public async validate(value: string): Promise<boolean> {
        const user = await this.userRepository.findByEmail(value);
        return typeof user === "undefined";
    }

    public defaultMessage(): string {
        return "Email is already in user";
    }
}
