import { Injectable } from '@nestjs/common';
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

import { StadiumService } from '../stadium.service';

@ValidatorConstraint({ async: true, name: 'StadiumExistsValidator' })
@Injectable()
class StadiumExistsValidator implements ValidatorConstraintInterface {
    constructor(private readonly stadiumService: StadiumService) {}

    public async validate(id: number): Promise<boolean> {
        const stadium = await this.stadiumService.findById(id, false);
        return typeof stadium !== 'undefined';
    }

    public defaultMessage(): string {
        return "Stadium with id $value doesn't exists";
    }
}

export function StadiumExists(validationOptions?: ValidationOptions): Function {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            name: 'StadiumExists',
            options: validationOptions,
            propertyName,
            target: object.constructor,
            validator: StadiumExistsValidator,
        });
    };
}
