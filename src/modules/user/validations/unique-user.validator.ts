import { Injectable } from '@nestjs/common';
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

import { UserService } from '@user/user.service';

@ValidatorConstraint({ async: true, name: 'UniqueUserValidator' })
@Injectable()
class UniqueUserValidator implements ValidatorConstraintInterface {
    constructor(private readonly userService: UserService) {}

    public async validate(value: string): Promise<boolean> {
        const user = await this.userService.findByEmail(value, false);
        return typeof user === 'undefined';
    }

    public defaultMessage(): string {
        return 'The e-mail $value is already in use';
    }
}

export function UniqueUser(validationOptions?: ValidationOptions): Function {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            name: 'UniqueUserEmail',
            options: validationOptions,
            propertyName,
            target: object.constructor,
            validator: UniqueUserValidator,
        });
    };
}
