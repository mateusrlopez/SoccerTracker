import { Injectable } from '@nestjs/common';
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

import { UserService } from '@user/user.service';

@ValidatorConstraint({ async: true, name: 'UserExistsValidator' })
@Injectable()
class UserExistsValidator implements ValidatorConstraintInterface {
    constructor(private readonly userService: UserService) {}

    public async validate(email: string): Promise<boolean> {
        const user = await this.userService.findByEmail(email, false);
        return typeof user !== 'undefined';
    }

    public defaultMessage(): string {
        return "A user with e-mail $value doesn't exists";
    }
}

export function UserExists(validationOptions?: ValidationOptions): Function {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            name: 'UserExists',
            options: validationOptions,
            propertyName,
            target: object.constructor,
            validator: UserExistsValidator,
        });
    };
}
