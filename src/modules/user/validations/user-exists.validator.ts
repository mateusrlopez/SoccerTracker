import { Injectable } from "@nestjs/common";
import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

import { UserService } from "@user/user.service";

@ValidatorConstraint({ async: true, name: "UserExists" })
@Injectable()
export class UserExists implements ValidatorConstraintInterface {
    constructor(private readonly userService: UserService) {}

    public async validate(email: string): Promise<boolean> {
        const user = await this.userService.findByEmail(email, false);
        return typeof user !== "undefined";
    }

    public defaultMessage(): string {
        return "A user with e-mail $value doesn't exists";
    }
}
